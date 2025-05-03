import { useRef, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

export const useTodoListForm = (initialTodos, saveTodoList, todoListId) => {
  const [todos, setTodos] = useState(initialTodos)
  const debouncedSaveRef = useRef()
  const previousTodosRef = useRef(initialTodos)
  const [errors, setErrors] = useState(Array(initialTodos.length).fill(false))

  useEffect(() => {
    debouncedSaveRef.current = debounce((updatedTodos) => {
      saveTodoList({ todos: updatedTodos }, todoListId)
    }, 1000)

    return () => debouncedSaveRef.current.cancel()
  }, [saveTodoList, todoListId])

  useEffect(() => {
    if (!debouncedSaveRef.current) return

    const nonEmptyTodos = todos.filter((todo) => todo.name.trim() !== '')
    const hasChanged = JSON.stringify(nonEmptyTodos) !== JSON.stringify(previousTodosRef.current)

    if (hasChanged) {
      debouncedSaveRef.current(nonEmptyTodos)
      previousTodosRef.current = nonEmptyTodos
    }
  }, [todos])

  const handleNameChange = (index, value) => {
    const isValid = validateInput(index, value)
    if (!isValid) return

    setTodos([
      ...todos.slice(0, index),
      { ...todos[index], name: value },
      ...todos.slice(index + 1),
    ])
  }

  const handleDeleteTodo = (index) => {
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)])
  }

  const handleAddTodo = () => {
    setTodos([...todos, { name: '', checked: false }])
  }

  const handleCheckboxToggle = (index) => {
    const updated = deepCopy(todos)
    updated[index].checked = !updated[index].checked
    setTodos(updated)
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

const deepCopy = (object) => {
  return JSON.parse(JSON.stringify(object))
}
