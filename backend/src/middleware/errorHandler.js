// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
}

export default errorHandler
