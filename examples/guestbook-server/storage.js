import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  appendMessageToGitHub,
  isGitHubStorageEnabled,
  readMessagesFromGitHub,
} from './github.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const LOCAL_FILE = path.join(__dirname, 'data', 'comments.json')

async function readLocalMessages() {
  try {
    const raw = await fs.readFile(LOCAL_FILE, 'utf8')
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

async function writeLocalMessages(list) {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true })
  await fs.writeFile(LOCAL_FILE, JSON.stringify(list, null, 2) + '\n', 'utf8')
}

export function getStorageMode() {
  return isGitHubStorageEnabled() ? 'github' : 'local'
}

export async function readMessages() {
  if (isGitHubStorageEnabled()) {
    const { messages } = await readMessagesFromGitHub()
    return messages
  }
  return readLocalMessages()
}

export async function appendMessage(entry) {
  if (isGitHubStorageEnabled()) {
    return appendMessageToGitHub(entry)
  }

  const list = await readLocalMessages()
  list.unshift(entry)
  await writeLocalMessages(list)
  return entry
}
