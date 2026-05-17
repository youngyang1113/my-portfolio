import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, 'data', 'comments.json')
const PORT = process.env.PORT || 3456

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

async function readComments() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeComments(list) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), 'utf8')
}

/** GET /api/comments — 最新在前 */
app.get('/api/comments', async (_req, res) => {
  const list = await readComments()
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  res.json(list)
})

/** POST /api/comments — body: { name, message } */
app.post('/api/comments', async (req, res) => {
  const name = String(req.body?.name || '').trim()
  const message = String(req.body?.message || '').trim()

  if (!name || name.length > 40) {
    return res.status(400).json({ error: '请填写有效昵称（1–40 字）' })
  }
  if (!message || message.length > 2000) {
    return res.status(400).json({ error: '请填写留言内容（不超过 2000 字）' })
  }

  const entry = {
    id: crypto.randomUUID(),
    name,
    message,
    createdAt: new Date().toISOString(),
  }

  const list = await readComments()
  list.unshift(entry)
  await writeComments(list)
  res.status(201).json(entry)
})

app.listen(PORT, () => {
  console.log(`Guestbook API: http://localhost:${PORT}`)
  console.log(`Demo page:       http://localhost:${PORT}/`)
})
