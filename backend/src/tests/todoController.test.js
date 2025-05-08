import { jest, expect, beforeEach, describe, it } from '@jest/globals'

// Mock the db module before importing the controller
const readTodos = jest.fn()
const writeTodos = jest.fn()

jest.unstable_mockModule('../utils/db.js', () => ({
  readTodos,
  writeTodos,
}))

// Import the controller after mocking
const { getTodos, updateTodo } = await import('../controllers/todosController.js')

//Create mock for a todo list
const mockTodoList = { list1: { title: 'Test', todos: [{ name: 'Write test', done: true }] } }

beforeEach(() => {
  readTodos.mockReset()
  writeTodos.mockReset()
})

describe('getTodos', () => {
  it('returns todos from db', async () => {
    // Arrange
    readTodos.mockResolvedValue(mockTodoList)

    const req = {}
    const res = { json: jest.fn() }
    const next = jest.fn()

    // Act
    await getTodos(req, res, next)

    // Assert
    expect(readTodos).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith(mockTodoList)
    expect(next).not.toHaveBeenCalled()
  })

  it('calls next on error', async () => {
    // Arrange
    const error = new Error('Read failed')
    readTodos.mockRejectedValue(error)

    const req = {}
    const res = { json: jest.fn() }
    const next = jest.fn()

    // Act
    await getTodos(req, res, next)

    // Assert
    expect(next).toHaveBeenCalledWith(error)
  })
})

describe('updateTodo', () => {
  it('updates title and todos', async () => {
    // Arrange
    const initialTodos = mockTodoList

    readTodos.mockResolvedValue(initialTodos)
    writeTodos.mockResolvedValue()

    const req = {
      params: { id: 'list1' },
      body: { title: 'New title', todos: [] },
    }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    const next = jest.fn()

    // Act
    await updateTodo(req, res, next)

    // Assert
    expect(readTodos).toHaveBeenCalled()
    expect(writeTodos).toHaveBeenCalledWith({ list1: { title: 'New title', todos: [] } })
    expect(res.json).toHaveBeenCalledWith({ title: 'New title', todos: [] })
    expect(next).not.toHaveBeenCalled()
  })

  it('returns 404 if todo not found', async () => {
    // Arrange
    readTodos.mockResolvedValue({})

    const req = {
      params: { id: 'missing' },
      body: {},
    }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    const next = jest.fn()

    // Act
    await updateTodo(req, res, next)

    // Assert
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: 'Todo not found' })
    expect(next).not.toHaveBeenCalled()
  })

  it('calls next on error', async () => {
    // Arrange
    const error = new Error('Something went wrong')
    readTodos.mockRejectedValue(error)

    const req = {
      params: { id: 'list1' },
      body: { title: 'Test' },
    }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    const next = jest.fn()

    // Act
    await updateTodo(req, res, next)

    // Assert
    expect(next).toHaveBeenCalledWith(error)
  })
})
