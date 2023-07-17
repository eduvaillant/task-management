import { MockProxy, mock, mockReset } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

import { PrismaTaskRepository } from './task.repository'
import { Task } from '../../../../../domain/entities'
import { TaskStatus } from '../../../../../domain/enums'

describe('PrismaTaskRepository', () => {
  let sut: PrismaTaskRepository
  let mockedPrismaHelper: any
  let fakeTask: Task

  beforeAll(() => {
    fakeTask = Task.newTask(
      'any_title',
      'any_description',
      new Date(),
      TaskStatus.PENDING,
      randomUUID(),
    )
    mockedPrismaHelper = mock()
    const taskPrismaMock: MockProxy<
      Pick<
        PrismaClient['task'],
        'findUnique' | 'create' | 'update' | 'delete' | 'findMany'
      >
    > = mock()
    mockedPrismaHelper['task'] = taskPrismaMock
  })

  beforeEach(() => {
    sut = new PrismaTaskRepository(mockedPrismaHelper)
    mockedPrismaHelper.task.findUnique.mockResolvedValue(fakeTask)
    mockedPrismaHelper.task.update.mockResolvedValue(fakeTask)
  })

  afterEach(() => {
    mockReset(mockedPrismaHelper)
  })

  describe('create()', () => {
    it('should create a new Task', async () => {
      const expectedInput = { data: fakeTask }

      await sut.create(fakeTask)

      expect(mockedPrismaHelper.task.create).toHaveBeenCalledTimes(1)
      expect(mockedPrismaHelper.task.create).toHaveBeenCalledWith(expectedInput)
    })

    it('should throw if prismaHelper.create() throws', async () => {
      const expectedError = new Error('create-error')

      mockedPrismaHelper.task.create.mockRejectedValueOnce(expectedError)

      await sut.create(fakeTask).catch((error) => {
        expect(error).toBe(expectedError)
      })
    })
  })

  describe('list()', () => {
    it('should return a list of Tasks on success', async () => {
      const userId = 'any_user_id'
      const expectedInput = { where: { userId } }
      mockedPrismaHelper.task.findMany.mockResolvedValueOnce([fakeTask])

      const actualTasks = await sut.list(userId)

      expect(mockedPrismaHelper.task.findMany).toHaveBeenCalledTimes(1)
      expect(mockedPrismaHelper.task.findMany).toHaveBeenCalledWith(
        expectedInput,
      )
      expect(actualTasks).toHaveLength(1)
    })

    it('should throw if prismaHelper.list() throws', async () => {
      const expectedError = new Error('list-error')

      mockedPrismaHelper.task.list.mockRejectedValueOnce(expectedError)

      await sut.create(fakeTask).catch((error) => {
        expect(error).toBe(expectedError)
      })
    })
  })

  describe('findById()', () => {
    it('should return a Task on success', async () => {
      const id = 'any_id'
      const expectedTask = fakeTask
      const expectedInput = { where: { id } }
      mockedPrismaHelper.task.findUnique.mockResolvedValueOnce(fakeTask)

      const actualTask = await sut.findById(id)

      expect(mockedPrismaHelper.task.findUnique).toHaveBeenCalledTimes(1)
      expect(mockedPrismaHelper.task.findUnique).toHaveBeenCalledWith(
        expectedInput,
      )
      expect(actualTask).toEqual(expectedTask)
    })

    it('should throw if prismaHelper.findUnique() throws', async () => {
      const expectedError = new Error('find-error')

      mockedPrismaHelper.task.list.mockRejectedValueOnce(expectedError)

      await sut.create(fakeTask).catch((error) => {
        expect(error).toBe(expectedError)
      })
    })
  })

  describe('update()', () => {
    it('should call prismaHelper.update() correctly', async () => {
      const expectedTask = fakeTask
      const expectedInput = {
        where: { id: expectedTask.id },
        data: {
          title: expectedTask.title,
          description: expectedTask.description,
          status: expectedTask.status,
          dueDate: expectedTask.dueDate,
          updatedAt: expectedTask.updatedAt,
        },
      }
      mockedPrismaHelper.task.findUnique.mockResolvedValueOnce(fakeTask)

      await sut.update(expectedTask)

      expect(mockedPrismaHelper.task.update).toHaveBeenCalledTimes(1)
      expect(mockedPrismaHelper.task.update).toHaveBeenCalledWith(expectedInput)
    })

    it('should throw if prismaHelper.update() throws', async () => {
      const expectedError = new Error('update-error')

      mockedPrismaHelper.task.update.mockRejectedValueOnce(expectedError)

      await sut.create(fakeTask).catch((error) => {
        expect(error).toBe(expectedError)
      })
    })
  })

  describe('delete()', () => {
    it('should call prismaHelper.delete() correctly', async () => {
      const id = 'any_id'
      const expectedInput = { where: { id } }

      await sut.delete(id)

      expect(mockedPrismaHelper.task.delete).toHaveBeenCalledTimes(1)
      expect(mockedPrismaHelper.task.delete).toHaveBeenCalledWith(expectedInput)
    })

    it('should throw if prismaHelper.delete() throws', async () => {
      const expectedError = new Error('delete-error')

      mockedPrismaHelper.task.delete.mockRejectedValueOnce(expectedError)

      await sut.create(fakeTask).catch((error) => {
        expect(error).toBe(expectedError)
      })
    })
  })

  describe('listByStatus()', () => {
    it('should return a list of Tasks on success', async () => {
      const status = TaskStatus.PENDING
      const userId = 'any_user_id'
      const expectedInput = { where: { status, userId } }
      mockedPrismaHelper.task.findMany.mockResolvedValueOnce([fakeTask])

      const actualTasks = await sut.listByStatus(status, userId)

      expect(mockedPrismaHelper.task.findMany).toHaveBeenCalledTimes(1)
      expect(mockedPrismaHelper.task.findMany).toHaveBeenCalledWith(
        expectedInput,
      )
      expect(actualTasks).toHaveLength(1)
    })

    it('should throw if prismaHelper.findMany() throws', async () => {
      const expectedError = new Error('lind-error')

      mockedPrismaHelper.task.list.mockRejectedValueOnce(expectedError)

      await sut.create(fakeTask).catch((error) => {
        expect(error).toBe(expectedError)
      })
    })
  })
})
