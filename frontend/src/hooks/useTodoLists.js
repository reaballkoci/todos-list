import { useState, useEffect } from 'react'
import { fetchTodoLists } from '../services/todoService'

export const useTodoLists = () => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  const saveTodoList = (id, { todos }) => {
    const listToUpdate = todoLists[id]
    setTodoLists({
      ...todoLists,
      [id]: { ...listToUpdate, todos },
    })
  }

  return { todoLists, activeList, setActiveList, setTodoLists, saveTodoList }
}
