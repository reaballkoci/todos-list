import { useState, useEffect } from 'react'
import { fetchTodoLists } from '../services/todoService'
import { updateTodoList } from '../services/todoService'

export const useTodoLists = () => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  const saveTodoList = async (todos, id) => {
    const updatedList = await updateTodoList(todos, id)
    setTodoLists((prev) => ({
      ...prev,
      [updatedList.id]: updatedList,
    }))
  }

  const isListCompleted = (todoList) => {
    return todoList.every((item) => item.checked === true)
  }

  return { todoLists, activeList, setActiveList, setTodoLists, saveTodoList, isListCompleted }
}
