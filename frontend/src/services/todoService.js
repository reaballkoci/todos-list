export const fetchTodoLists = () => {
  return fetch('/todos')
    .then((response) => response.json())
    .catch((err) => {
      throw new Error(`Fetch lits failed with status ${err.status}`)
    })
}

export const updateTodoList = (updatedTodo, id) => {
  return fetch(`/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
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
