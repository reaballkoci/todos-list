import { renderHook, act } from '@testing-library/react-hooks'
import { useTodoLists } from '../hooks/useTodoLists'
import * as todoService from '../services/todoService'

jest.mock('../services/todoService')

describe('useTodoLists', () => {
  const mockTodos = {
    1: { id: 1, todos: [{ id: 'a', checked: false }] },
    2: { id: 2, todos: [{ id: 'b', checked: true }] },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches todo lists on mount', async () => {
    todoService.fetchTodoLists.mockResolvedValue(mockTodos)

    const { result, waitForNextUpdate } = renderHook(() => useTodoLists())
    await waitForNextUpdate()

    expect(todoService.fetchTodoLists).toHaveBeenCalled()
    expect(result.current.todoLists).toEqual(mockTodos)
  })

  it('updates todo list using saveTodoList', async () => {
    const updatedList = { id: 1, todos: [{ id: 'a', checked: true }] }

    todoService.fetchTodoLists.mockResolvedValue({
      1: { id: 1, todos: [{ id: 'a', checked: false }] },
    })
    todoService.updateTodoList.mockResolvedValue(updatedList)

    const { result, waitForNextUpdate } = renderHook(() => useTodoLists())
    await waitForNextUpdate()

    await act(async () => {
      await result.current.saveTodoList(updatedList.todos, updatedList.id)
    })

    expect(todoService.updateTodoList).toHaveBeenCalledWith(updatedList.todos, updatedList.id)
    expect(result.current.todoLists[1]).toEqual(updatedList)
  })
})
