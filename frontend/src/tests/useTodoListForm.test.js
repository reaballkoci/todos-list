import { renderHook, act } from '@testing-library/react-hooks'
import { useTodoListForm } from '../hooks/useTodoListForm'

jest.useFakeTimers()

describe('useTodoListForm', () => {
  const initialTodos = [
    { name: 'Buy milk', done: false },
    { name: 'Write tests', done: true },
  ]

  const id = 'list-1'

  const saveTodoListMock = jest.fn()

  beforeEach(() => {
    saveTodoListMock.mockClear()
    jest.clearAllTimers()
  })

  it('should initialize with given todos and no errors', () => {
    const { result } = renderHook(() => useTodoListForm(initialTodos, saveTodoListMock, id))

    expect(result.current.todos).toEqual(initialTodos)
    expect(result.current.errors).toEqual([false, false])
  })

  it('should add a new todo', () => {
    const { result } = renderHook(() => useTodoListForm(initialTodos, saveTodoListMock, id))

    act(() => {
      result.current.handleAddTodo()
    })

    expect(result.current.todos.length).toBe(3)
    expect(result.current.todos[2]).toEqual({ name: '', done: false })
  })

  it('should delete a todo by index', () => {
    const { result } = renderHook(() => useTodoListForm(initialTodos, saveTodoListMock, id))

    act(() => {
      result.current.handleDeleteTodo(0)
    })

    expect(result.current.todos).toEqual([initialTodos[1]])
  })

  it('should update name and validate input', () => {
    const { result } = renderHook(() => useTodoListForm(initialTodos, saveTodoListMock, id))

    act(() => {
      result.current.handleNameChange(0, 'Go running!')
    })

    expect(result.current.todos[0].name).toBe('Go running!')
    expect(result.current.errors[0]).toBe(false)
  })

  it('should reject invalid characters in name', () => {
    const { result } = renderHook(() => useTodoListForm(initialTodos, saveTodoListMock, id))

    act(() => {
      result.current.handleNameChange(0, 'Invalid <>')
    })

    // Name shouldn't be updated
    expect(result.current.todos[0].name).toBe('Buy milk')
    expect(result.current.errors[0]).toBe(true)
  })

  it('should toggle checkbox', () => {
    const { result } = renderHook(() => useTodoListForm(initialTodos, saveTodoListMock, id))

    act(() => {
      result.current.handleCheckboxToggle(0)
    })

    expect(result.current.todos[0].done).toBe(true)
  })

  it('should debounce save when todos change', () => {
    const { result } = renderHook(() => useTodoListForm(initialTodos, saveTodoListMock, id))

    act(() => {
      result.current.handleNameChange(0, 'New name')
    })

    // Not yet called immediately
    expect(saveTodoListMock).not.toHaveBeenCalled()

    // Fast-forward exactly 1 second to trigger debounce
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(saveTodoListMock).toHaveBeenCalledTimes(1)
    expect(saveTodoListMock).toHaveBeenCalledWith(
      {
        todos: [
          { name: 'New name', done: false },
          { name: 'Write tests', done: true },
        ],
      },
      id
    )
  })
})
