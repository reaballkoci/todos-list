function validateApiKey(req, res, next) {
  const appKey = req.headers['x-app-key']
  const expectedKey = process.env.APP_SECRET_KEY

  if (appKey !== expectedKey) {
    return res.status(403).json({ error: 'Unauthorized request' })
  }

  next()
}

export default validateApiKey
