import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import TodoListForm from '../components/Todo/TodoListForm'
import '@testing-library/jest-dom'

jest.mock('../hooks/useTodoListForm', () => ({
  useTodoListForm: jest.fn(),
}))

const mockHandleNameChange = jest.fn()
const mockHandleDeleteTodo = jest.fn()
const mockHandleAddTodo = jest.fn()
const mockHandleCheckboxToggle = jest.fn()

const mockTodos = [
  { name: 'Buy eggs', checked: false },
  { name: 'Walk dog', checked: true },
]

const mockErrors = [false, false]

describe('TodoListForm', () => {
  beforeEach(() => {
    require('../hooks/useTodoListForm').useTodoListForm.mockReturnValue({
      todos: mockTodos,
      errors: mockErrors,
      handleNameChange: mockHandleNameChange,
      handleDeleteTodo: mockHandleDeleteTodo,
      handleAddTodo: mockHandleAddTodo,
      handleCheckboxToggle: mockHandleCheckboxToggle,
    })
  })

  const setup = () =>
    render(
      <TodoListForm
        todoList={{ id: 'list-1', title: 'My Tasks', todos: mockTodos }}
        saveTodoList={jest.fn()}
      />
    )

  it('renders the component with title and todos', () => {
    setup()

    expect(screen.getByText('My Tasks')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Buy eggs')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Walk dog')).toBeInTheDocument()
  })

  it('calls handleNameChange when typing in a field', () => {
    setup()

    const input = screen.getByDisplayValue('Buy eggs')
    fireEvent.change(input, { target: { value: 'Buy milk' } })

    expect(mockHandleNameChange).toHaveBeenCalledWith(0, 'Buy milk')
  })

  it('calls handleCheckboxToggle when a checkbox is clicked', () => {
    setup()

    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])

    expect(mockHandleCheckboxToggle).toHaveBeenCalledWith(0)
  })

  it('calls handleDeleteTodo when delete button is clicked', () => {
    setup()

    const deleteButtons = screen.getAllByRole('button', { name: '' })
    fireEvent.click(deleteButtons[0])

    expect(mockHandleDeleteTodo).toHaveBeenCalledWith(0)
  })

  it('calls handleAddTodo when add button is clicked', () => {
    setup()

    const addButton = screen.getByRole('button', { name: /add todo/i })
    fireEvent.click(addButton)

    expect(mockHandleAddTodo).toHaveBeenCalled()
  })

  it('shows validation error when error is true', () => {
    require('../hooks/useTodoListForm').useTodoListForm.mockReturnValueOnce({
      todos: mockTodos,
      errors: [true, false],
      handleNameChange: mockHandleNameChange,
      handleDeleteTodo: mockHandleDeleteTodo,
      handleAddTodo: mockHandleAddTodo,
      handleCheckboxToggle: mockHandleCheckboxToggle,
    })

    setup()

    expect(screen.getByText('Only letters and numbers allowed')).toBeInTheDocument()
  })
})
