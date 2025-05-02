export const fetchTodoLists = () => {
  return fetch('/todos', {
    headers: { 'X-APP-KEY': process.env.REACT_APP_SECRET_KEY },
  })
    .then((response) => response.json())
    .catch((err) => {
      throw new Error(`Fetch lists failed with status ${err.status}`)
    })
}

export const updateTodoList = (updatedTodo, id) => {
  return fetch(`/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-APP-KEY': process.env.REACT_APP_SECRET_KEY,
    },
    body: JSON.stringify(updatedTodo),
  })
    .then(async (response) => {
      return response.json()
    })
    .catch((err) => {
      throw new Error(`Update list ${id} failed with status ${err.status}`)
    })
}
