import { jest, expect, beforeEach, describe, it } from '@jest/globals'

// Create mocks for fs.promises methods
const readFile = jest.fn()
const writeFile = jest.fn()

//Create mock for a todo list
const mockTodoList = { list1: { title: 'Test', todos: [{ name: 'Write test', done: true }] } }

// Mock the fs/promises module before importing db.js
jest.unstable_mockModule('fs/promises', () => ({
  default: {
    readFile,
    writeFile,
  },
}))

// Import the functions after mocking
const { readTodos, writeTodos } = await import('../utils/db.js')

beforeEach(() => {
  readFile.mockReset()
  writeFile.mockReset()
})

describe('readTodos', () => {
  it('returns parsed data from file', async () => {
    // Arrange
    const fileContent = JSON.stringify(mockTodoList)
    readFile.mockResolvedValue(fileContent)

    // Act
    const result = await readTodos()

    // Assert
    expect(readFile).toHaveBeenCalled()
    expect(result).toEqual(mockTodoList)
  })

  it('returns empty array if file not found (ENOENT)', async () => {
    // Arrange
    const error = new Error('File not found')
    error.code = 'ENOENT'
    readFile.mockRejectedValue(error)

    // Act
    const result = await readTodos()

    // Assert
    expect(result).toEqual([])
  })
})

describe('writeTodos', () => {
  it('writes formatted JSON to file', async () => {
    // Act
    await writeTodos(mockTodoList)

    // Assert
    expect(writeFile).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(mockTodoList, null, 2)
    )
  })
})
