import express from 'express'
import { getTodos, updateTodo } from '../controllers/todosController.js'

const router = express.Router()

router.get('/', getTodos)
router.put('/:id', updateTodo)

export default router
