import { describe, it, expect, jest } from '@jest/globals'
import validateApiKey from '../middleware/apiKeyValidator'

// Mocking the req, res, and next objects
const createMockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

const createMockNext = () => jest.fn()

describe('validateApiKey Middleware', () => {
  it('should call next() when the API key is valid', () => {
    // Arrange
    const req = { headers: { 'x-app-key': 'valid-api-key' } }
    const res = createMockResponse()
    const next = createMockNext()

    process.env.APP_SECRET_KEY = 'valid-api-key'

    // Act
    validateApiKey(req, res, next)

    // Assert
    expect(next).toHaveBeenCalled()
  })

  it('should return 403 if the API key is invalid', () => {
    // Arrange
    const req = { headers: { 'x-app-key': 'invalid-api-key' } }
    const res = createMockResponse()
    const next = createMockNext()

    process.env.APP_SECRET_KEY = 'valid-api-key'

    // Act
    validateApiKey(req, res, next)

    // Assert
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized request' })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 403 if no API key is provided', () => {
    // Arrange
    const req = { headers: {} }
    const res = createMockResponse()
    const next = createMockNext()

    process.env.APP_SECRET_KEY = 'valid-api-key'

    // Act
    validateApiKey(req, res, next)

    // Assert
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized request' })
    expect(next).not.toHaveBeenCalled()
  })
})
