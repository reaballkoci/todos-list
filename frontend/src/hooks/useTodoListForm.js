import { useRef, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

export const useTodoListForm = (initialTodos, saveTodoList, todoListId) => {
  const [todos, setTodos] = useState(initialTodos)
  const debouncedSaveRef = useRef()
  const previousTodosRef = useRef(initialTodos)

  useEffect(() => {
    debouncedSaveRef.current = debounce((updatedTodos) => {
      saveTodoList({ todos: updatedTodos }, todoListId)
    }, 1000)

    return () => debouncedSaveRef.current.cancel()
  }, [saveTodoList, todoListId])

  useEffect(() => {
    if (!debouncedSaveRef.current) return

    const nonEmptyTodos = todos.filter((todo) => todo.trim() !== '')
    const hasChanged = JSON.stringify(nonEmptyTodos) !== JSON.stringify(previousTodosRef.current)

    if (hasChanged) {
      debouncedSaveRef.current(nonEmptyTodos)
      previousTodosRef.current = nonEmptyTodos
    }
  }, [todos])

  const handleNameChange = (index, value) => {
    setTodos([...todos.slice(0, index), value, ...todos.slice(index + 1)])
  }

  const handleDeleteTodo = (index) => {
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)])
  }

  const handleAddTodo = () => {
    setTodos([...todos, ''])
  }

  return { todos, setTodos, handleNameChange, handleDeleteTodo, handleAddTodo }
}
