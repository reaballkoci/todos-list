import { useState } from 'react'

export const useTodoListForm = (todoList, saveTodoList) => {
  const [todos, setTodos] = useState(todoList.todos)

  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  const handleNameChange = (index, value) => {
    setTodos([...todos.slice(0, index), value, ...todos.slice(index + 1)])
  }

  const handleDeleteTodo = (index) => {
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)])
  }

  const handleAddTodo = () => {
    setTodos([...todos, ''])
  }

  return { todos, setTodos, handleSubmit, handleNameChange, handleDeleteTodo, handleAddTodo }
}
