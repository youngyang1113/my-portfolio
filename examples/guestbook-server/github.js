const GITHUB_API = 'https://api.github.com'

function getConfig() {
  const token = process.env.GITHUB_TOKEN?.trim()
  if (!token) return null

  const repo = process.env.GITHUB_REPO?.trim() || 'youngyang1113/my-portfolio'
  const branch = process.env.GITHUB_BRANCH?.trim() || 'master'
  const path = process.env.GITHUB_MESSAGES_PATH?.trim() || 'data/messages.json'

  const [owner, repoName] = repo.split('/')
  if (!owner || !repoName) {
    throw new Error('GITHUB_REPO must be owner/repo')
  }

  return { token, owner, repoName, branch, path }
}

function githubHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'my-portfolio-guestbook',
  }
}

async function githubFetch(url, token, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { ...githubHeaders(token), ...options.headers },
  })

  if (!res.ok) {
    let detail = res.statusText
    try {
      const body = await res.json()
      detail = body.message || JSON.stringify(body)
    } catch {
      /* ignore */
    }
    const err = new Error(`GitHub API ${res.status}: ${detail}`)
    err.status = res.status
    throw err
  }

  return res
}

/** @returns {{ messages: object[], sha: string | null }} */
export async function readMessagesFromGitHub() {
  const cfg = getConfig()
  if (!cfg) throw new Error('GITHUB_TOKEN is not set')

  const url = `${GITHUB_API}/repos/${cfg.owner}/${cfg.repoName}/contents/${encodeURIComponent(cfg.path)}?ref=${encodeURIComponent(cfg.branch)}`

  const res = await fetch(url, { headers: githubHeaders(cfg.token) })

  if (res.status === 404) {
    return { messages: [], sha: null }
  }

  if (!res.ok) {
    let detail = res.statusText
    try {
      const body = await res.json()
      detail = body.message || detail
    } catch {
      /* ignore */
    }
    throw new Error(`GitHub read failed (${res.status}): ${detail}`)
  }

  const data = await res.json()
  const decoded = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8')
  const messages = JSON.parse(decoded)

  if (!Array.isArray(messages)) {
    throw new Error('messages.json must contain a JSON array')
  }

  return { messages, sha: data.sha }
}

/** @param {object[]} messages @param {string | null} sha */
export async function writeMessagesToGitHub(messages, sha, commitMessage) {
  const cfg = getConfig()
  if (!cfg) throw new Error('GITHUB_TOKEN is not set')

  const content = Buffer.from(JSON.stringify(messages, null, 2) + '\n', 'utf8').toString('base64')
  const url = `${GITHUB_API}/repos/${cfg.owner}/${cfg.repoName}/contents/${encodeURIComponent(cfg.path)}`

  const body = {
    message: commitMessage,
    content,
    branch: cfg.branch,
  }
  if (sha) body.sha = sha

  await githubFetch(url, cfg.token, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export function isGitHubStorageEnabled() {
  return Boolean(getConfig())
}

/** 追加一条留言；409 冲突时重试一次 */
export async function appendMessageToGitHub(entry) {
  const commitMessage = `guestbook: message from ${entry.name}`

  for (let attempt = 0; attempt < 2; attempt++) {
    const { messages, sha } = await readMessagesFromGitHub()
    messages.unshift(entry)
    try {
      await writeMessagesToGitHub(messages, sha, commitMessage)
      return entry
    } catch (err) {
      if (err.status === 409 && attempt === 0) continue
      throw err
    }
  }

  throw new Error('Failed to save message after retry')
}
