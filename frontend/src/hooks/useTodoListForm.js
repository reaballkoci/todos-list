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

    const nonEmptyTodos = todos.filter((todo) => todo.name.trim() !== '')
    const hasChanged = JSON.stringify(nonEmptyTodos) !== JSON.stringify(previousTodosRef.current)

    if (hasChanged) {
      debouncedSaveRef.current(nonEmptyTodos)
      previousTodosRef.current = nonEmptyTodos
    }
  }, [todos])

  const handleNameChange = (index, value) => {
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

  return {
    todos,
    handleCheckboxToggle,
    handleNameChange,
    handleDeleteTodo,
    handleAddTodo,
  }
}

const deepCopy = (object) => {
  return JSON.parse(JSON.stringify(object))
}
