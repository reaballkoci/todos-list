import React from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useTodoListForm } from '../../hooks/useTodoListForm'
import { styles } from '../../styles/styles'

const TodoListForm = ({ todoList, saveTodoList }) => {
  const { todos, errors, handleNameChange, handleDeleteTodo, handleAddTodo, handleCheckboxToggle } =
    useTodoListForm(todoList.todos, saveTodoList, todoList.id)

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={styles.form}>
          {todos.map((todo, index) => (
            <div key={index} style={styles.todoItem}>
              <Checkbox checked={todo.checked} onChange={() => handleCheckboxToggle(index)} />
              <TextField
                sx={styles.textField}
                label='What to do?'
                value={todo.name}
                onChange={(event) => handleNameChange(index, event.target.value)}
                error={errors[index]}
                helperText={errors[index] ? 'Only letters and numbers allowed' : ''}
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
