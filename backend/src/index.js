import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
