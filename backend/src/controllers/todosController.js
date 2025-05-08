import { readTodos, writeTodos } from '../utils/db.js'

export const getTodos = async (req, res, next) => {
  try {
    const todos = await readTodos()
    res.json(todos)
  } catch (err) {
    next(err)
  }
}

export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params
    const { todos: todosArray } = req.body
    const allTodos = await readTodos()

    if (!allTodos[id]) return res.status(404).json({ error: 'Todo not found' })

    if (todosArray) allTodos[id].todos = todosArray

    await writeTodos(allTodos)

    res.json(allTodos[id])
  } catch (err) {
    next(err)
  }
}
