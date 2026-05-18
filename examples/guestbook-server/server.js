import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { appendMessage, getStorageMode, readMessages } from './storage.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3456

const app = express()
app.use(cors())
app.use(express.json({ limit: '32kb' }))
app.use(express.static(path.join(__dirname, 'public')))

function validateEntry(body) {
  const name = String(body?.name || '').trim()
  const message = String(body?.message || '').trim()

  if (!name || name.length > 40) {
    return { error: '请填写有效昵称（1–40 字）' }
  }
  if (!message || message.length > 2000) {
    return { error: '请填写留言内容（不超过 2000 字）' }
  }

  return {
    entry: {
      id: crypto.randomUUID(),
      name,
      message,
      createdAt: new Date().toISOString(),
    },
  }
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    storage: getStorageMode(),
  })
})

/** GET /api/comments — 最新在前（数据来自 GitHub data/messages.json 或本地文件） */
app.get('/api/comments', async (_req, res) => {
  try {
    const list = await readMessages()
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    res.json(list)
  } catch (err) {
    console.error('GET /api/comments', err)
    res.status(500).json({ error: '加载留言失败' })
  }
})

/** POST /api/comments — 写入 GitHub 仓库 messages.json */
app.post('/api/comments', async (req, res) => {
  const validated = validateEntry(req.body)
  if (validated.error) {
    return res.status(400).json({ error: validated.error })
  }

  try {
    const entry = await appendMessage(validated.entry)
    res.status(201).json(entry)
  } catch (err) {
    console.error('POST /api/comments', err)
    const status = err.status === 401 || err.status === 403 ? 503 : 500
    res.status(status).json({
      error:
        status === 503
          ? '留言服务未正确配置 GitHub 权限，请联系站点管理员'
          : '保存留言失败，请稍后再试',
    })
  }
})

app.listen(PORT, () => {
  console.log(`Guestbook API: http://localhost:${PORT}`)
  console.log(`Storage mode:    ${getStorageMode()}`)
  console.log(`Demo page:       http://localhost:${PORT}/`)
})
