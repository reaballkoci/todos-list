// services/todoService.test.js
import { fetchTodoLists, updateTodoList } from '../services/todoService'

const ID = 'list-1'

global.fetch = jest.fn()

beforeEach(() => {
  fetch.mockClear()
})

describe('fetchTodoLists', () => {
  it('calls the correct endpoint with correct headers', async () => {
    const mockResponse = [{ id: ID, todos: [] }]
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    })

    const result = await fetchTodoLists()

    expect(fetch).toHaveBeenCalledWith('/todos', {
      headers: { 'X-APP-KEY': process.env.REACT_APP_SECRET_KEY },
    })
    expect(result).toEqual(mockResponse)
  })

  it('throws error on invalid API key (403)', async () => {
    fetch.mockRejectedValueOnce({ status: 403 })

    await expect(fetchTodoLists()).rejects.toThrow('Fetch lists failed with status 403')
  })
})

describe('updateTodoList', () => {
  it('calls correct endpoint and sends data', async () => {
    const updatedTodo = { todos: [{ name: 'Do test', done: false }] }
    const id = ID
    const mockResponse = { id, ...updatedTodo }

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    })

    const result = await updateTodoList(updatedTodo, id)

    expect(fetch).toHaveBeenCalledWith(`/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-APP-KEY': process.env.REACT_APP_SECRET_KEY,
      },
      body: JSON.stringify(updatedTodo),
    })
    expect(result).toEqual(mockResponse)
  })
})
