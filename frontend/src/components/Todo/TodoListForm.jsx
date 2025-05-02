import React from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useTodoListForm } from '../../hooks/useTodoListForm'
import { styles } from '../../styles/styles'

const TodoListForm = ({ todoList, saveTodoList }) => {
  const { todos, handleNameChange, handleDeleteTodo, handleAddTodo } = useTodoListForm(
    todoList.todos,
    saveTodoList,
    todoList.id
  )

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={styles.form}>
          {todos.map((name, index) => (
            <div key={index} style={styles.todoItem}>
              <Typography sx={styles.todoIndex} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={styles.textField}
                label='What to do?'
                value={name}
                onChange={(event) => handleNameChange(index, event.target.value)}
              />
              <Button
                sx={styles.deleteButton}
                size='small'
                color='secondary'
                onClick={() => handleDeleteTodo(index)}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button type='button' color='primary' onClick={handleAddTodo}>
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}

export default TodoListForm
