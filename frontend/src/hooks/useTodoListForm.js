import { useRef, useState } from 'react'
import debounce from 'lodash.debounce'

export const useTodoListForm = (initialTodos, saveTodoList, todoListId) => {
  const [todos, setTodos] = useState(initialTodos)
  const debouncedSaveRef = useRef(
    debounce((updatedTodos) => {
      saveTodoList({ todos: updatedTodos }, todoListId)
    }, 1000)
  )
  const [errors, setErrors] = useState(Array(initialTodos.length).fill(false))

  const handleNameChange = (index, value) => {
    const isValid = validateInput(index, value)
    if (!isValid) return

    const updatedTodos = [
      ...todos.slice(0, index),
      { ...todos[index], name: value },
      ...todos.slice(index + 1),
    ]

    debouncedSaveRef.current(updatedTodos)
    setTodos(updatedTodos)
  }

  const handleDeleteTodo = (index) => {
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)])
  }

  const handleAddTodo = () => {
    setTodos([...todos, { name: '', done: false }])
  }

  const handleCheckboxToggle = (index) => {
    const updatedTodos = [
      ...todos.slice(0, index),
      { ...todos[index], done: !todos[index].done },
      ...todos.slice(index + 1),
    ]

    debouncedSaveRef.current(updatedTodos)
    setTodos(updatedTodos)
  }

  const validateInput = (index, value) => {
    const isValid = /^[a-zA-Z0-9 .,!?'":;()-]*$/.test(value)

    const updatedErrors = [...errors]
    updatedErrors[index] = !isValid
    setErrors(updatedErrors)

    return isValid
  }

  return {
    todos,
    errors,
    handleCheckboxToggle,
    handleNameChange,
    handleDeleteTodo,
    handleAddTodo,
  }
}
