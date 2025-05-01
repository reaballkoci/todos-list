import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_FILE = process.env.DB_FILE || path.join(__dirname, './todos.json')

export const readTodos = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error
  }
}

export const writeTodos = async (todos) => {
  await fs.writeFile(DB_FILE, JSON.stringify(todos, null, 2))
}
