import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoLists from '../components/Todo/TodoLists'
import { useTodoLists } from '../hooks/useTodoLists'

jest.mock('../hooks/useTodoLists', () => ({
  useTodoLists: jest.fn(),
}))

jest.mock('../components/Todo/TodoListForm', () => () => (
  <div data-testid='todo-list-form'>Mock TodoListForm</div>
))

describe('TodoLists', () => {
  const mockSetActiveList = jest.fn()
  const mockSaveTodoList = jest.fn()
  const mockIsListCompleted = jest.fn()

  const mockTodoLists = {
    'list-1': { title: 'Groceries', todos: [{ name: 'Apples', checked: true }] },
    'list-2': { title: 'Work', todos: [{ name: 'Emails', checked: false }] },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders todo list buttons and list titles', () => {
    useTodoLists.mockReturnValue({
      todoLists: mockTodoLists,
      activeList: undefined,
      setActiveList: mockSetActiveList,
      saveTodoList: mockSaveTodoList,
      isListCompleted: mockIsListCompleted,
    })

    render(<TodoLists />)

    expect(screen.getByText('My Todo Lists')).toBeInTheDocument()
    expect(screen.getByText('Groceries')).toBeInTheDocument()
    expect(screen.getByText('Work')).toBeInTheDocument()
  })

  it('calls setActiveList when a list is clicked', () => {
    useTodoLists.mockReturnValue({
      todoLists: mockTodoLists,
      activeList: undefined,
      setActiveList: mockSetActiveList,
      saveTodoList: mockSaveTodoList,
      isListCompleted: mockIsListCompleted,
    })

    render(<TodoLists />)

    fireEvent.click(screen.getByText('Groceries'))
    expect(mockSetActiveList).toHaveBeenCalledWith('list-1')
  })

  it('renders TodoListForm when activeList is set', () => {
    useTodoLists.mockReturnValue({
      todoLists: mockTodoLists,
      activeList: 'list-1',
      setActiveList: mockSetActiveList,
      saveTodoList: mockSaveTodoList,
      isListCompleted: mockIsListCompleted,
    })

    render(<TodoLists />)

    expect(screen.getByTestId('todo-list-form')).toBeInTheDocument()
  })

  it('shows correct icon for completed and pending lists', () => {
    mockIsListCompleted.mockImplementation((todos) => todos[0].checked)

    useTodoLists.mockReturnValue({
      todoLists: mockTodoLists,
      activeList: undefined,
      setActiveList: mockSetActiveList,
      saveTodoList: mockSaveTodoList,
      isListCompleted: mockIsListCompleted,
    })

    render(<TodoLists />)

    // Groceries is completed, so CheckCircle is shown
    expect(screen.getAllByTestId('CheckCircleIcon')).toHaveLength(1)

    // Work is not completed, so Pending icon is shown
    expect(screen.getAllByTestId('PendingIcon')).toHaveLength(1)
  })
})
