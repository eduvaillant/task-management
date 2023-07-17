import { Task } from './task.entity'
import { TaskStatus } from '../../../domain/enums'
import { randomUUID } from 'crypto'

describe('Task', () => {
  it('should instantiate a Task when call newTask with valid params', () => {
    const expectedTitle = 'any_valid_title'
    const expectedDescription = 'any_valid_description'
    const expectedStatus = TaskStatus.PENDING
    const expectedDueDate = new Date()
    const expectedUserId = randomUUID()

    const actualTask = Task.newTask(
      expectedTitle,
      expectedDescription,
      expectedDueDate,
      expectedStatus,
      expectedUserId,
    )

    expect(actualTask.id).toBeDefined()
    expect(actualTask.title).toBe(expectedTitle)
    expect(actualTask.description).toBe(expectedDescription)
    expect(actualTask.status).toBe(expectedStatus)
    expect(actualTask.userId).toBe(expectedUserId)
    expect(actualTask.dueDate).toBe(expectedDueDate)
    expect(actualTask.createdAt).toBeDefined()
    expect(actualTask.updatedAt).toBeDefined()
  })

  it('should instantiate a Task when call fromDb with valid params', () => {
    const expectedId = 'any_id'
    const expectedTitle = 'any_valid_title'
    const expectedDescription = 'any_valid_description'
    const expectedStatus = TaskStatus.PENDING
    const expectedDueDate = new Date()
    const expectedCreatedAt = new Date()
    const expectedUpdatedAt = new Date()
    const expectedUserId = randomUUID()

    const actualTask = Task.fromDb({
      id: expectedId,
      title: expectedTitle,
      description: expectedDescription,
      status: expectedStatus,
      dueDate: expectedDueDate,
      createdAt: expectedCreatedAt,
      updatedAt: expectedUpdatedAt,
      userId: expectedUserId,
    })

    expect(actualTask.id).toBeDefined()
    expect(actualTask.title).toBe(expectedTitle)
    expect(actualTask.description).toBe(expectedDescription)
    expect(actualTask.status).toBe(expectedStatus)
    expect(actualTask.userId).toBe(expectedUserId)
    expect(actualTask.dueDate).toBe(expectedDueDate)
    expect(actualTask.createdAt).toBe(expectedCreatedAt)
    expect(actualTask.updatedAt).toBe(expectedUpdatedAt)
  })

  it('should update title and/or description and/or dueDate and/or status when call update()', () => {
    const expectedTitle = 'any_updated_title'
    const expectedDescription = 'any_updated_description'
    const expectedStatus = TaskStatus.PENDING
    const expectedDueDate = new Date()
    const expectedUserId = randomUUID()

    const actualTask = Task.newTask(
      'any_valid_title',
      'any_valid_description',
      new Date(),
      TaskStatus.COMPLETED,
      expectedUserId,
    )
    actualTask.update(
      expectedTitle,
      expectedDescription,
      expectedStatus,
      expectedDueDate,
    )

    expect(actualTask.title).toBe(expectedTitle)
    expect(actualTask.description).toBe(expectedDescription)
    expect(actualTask.status).toBe(expectedStatus)
    expect(actualTask.dueDate).toBe(expectedDueDate)
    expect(actualTask.userId).toBe(expectedUserId)
  })
})
