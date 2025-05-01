import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import errorHandler from './middleware/errorHandler.js'
import todosRouter from './routes/todos.js'

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/todos', todosRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
