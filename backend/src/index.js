import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import todosRouter from './routes/todos.js'
import errorHandler from './middleware/errorHandler.js'
import validateApiKey from './middleware/apiKeyValidator.js'

const app = express()

dotenv.config()

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT'],
    allowedHeaders: ['Content-type', 'X-APP-KEY'],
  })
)

app.use(express.json())

app.use(validateApiKey)

app.use('/todos', todosRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
