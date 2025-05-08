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
    const todoLists = await readTodos()

    if (!todoLists[id]) return res.status(404).json({ error: 'Todo not found' })

    if (todosArray) todoLists[id].todos = todosArray

    await writeTodos(todoLists)

    res.json(todoLists[id])
  } catch (err) {
    next(err)
  }
}
