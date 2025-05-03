import { describe, it, expect, jest } from '@jest/globals'
import errorHandler from '../middleware/errorHandler'

describe('errorHandler Middleware', () => {
  it('should log the error and send a 500 status with an error message', () => {
    // Arrange
    const err = new Error('Something went wrong')
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }
    const next = jest.fn()

    // Spy on console.error to check if the error is logged
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    // Act
    errorHandler(err, req, res, next)

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(err)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
    expect(next).not.toHaveBeenCalled()

    // Clean up spy
    consoleSpy.mockRestore()
  })
})
