import { MockProxy, mock } from 'jest-mock-extended'
import { randomUUID } from 'crypto'

import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  ListTasksUseCase,
  UpdateTaskUseCase,
} from '../../../../domain/use-cases'
import { TaskController } from './task.controller'
import { Task } from '../../../../domain/entities'
import { TaskStatus } from '../../../../domain/enums'

describe('TaskController', () => {
  let sut: TaskController
  let mockedCreateTaskUseCase: MockProxy<CreateTaskUseCase>
  let mockedListTasksUseCase: MockProxy<ListTasksUseCase>
  let mockedUpdateTasksUseCase: MockProxy<UpdateTaskUseCase>
  let mockedDeleteTaskUseCase: MockProxy<DeleteTaskUseCase>
  let fakeTask: Task
  let fakeUserId: string
  let fakeRequest: any

  beforeAll(() => {
    mockedCreateTaskUseCase = mock()
    mockedListTasksUseCase = mock()
    mockedUpdateTasksUseCase = mock()
    mockedDeleteTaskUseCase = mock()
    fakeUserId = randomUUID()
    fakeTask = Task.newTask(
      'any_title',
      'any_description',
      new Date(),
      TaskStatus.PENDING,
      fakeUserId,
    )
    fakeRequest = {
      user: {
        sub: fakeUserId,
      },
    }
    mockedCreateTaskUseCase.execute.mockResolvedValue(fakeTask)
    mockedListTasksUseCase.execute.mockResolvedValue([fakeTask])
    mockedUpdateTasksUseCase.execute.mockResolvedValue(fakeTask)
  })

  beforeEach(() => {
    sut = new TaskController(
      mockedCreateTaskUseCase,
      mockedListTasksUseCase,
      mockedUpdateTasksUseCase,
      mockedDeleteTaskUseCase,
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create()', () => {
    it('should call CreateTaskUseCase correctly', async () => {
      const createTaskDto = {
        title: 'any_title',
        dueDate: new Date(),
        description: 'any_description',
        status: TaskStatus.PENDING,
      }

      await sut.create(createTaskDto, fakeRequest)

      expect(mockedCreateTaskUseCase.execute).toHaveBeenCalledTimes(1)
      expect(mockedCreateTaskUseCase.execute).toHaveBeenCalledWith({
        ...createTaskDto,
        userId: fakeRequest.user.sub,
      })
    })

    it('should throw if CreateTaskUseCase throws', async () => {
      const createTaskDto = {
        title: 'any_title',
        dueDate: new Date(),
        description: 'any_description',
        status: TaskStatus.PENDING,
      }

      const expectedError = new Error('create-error')
      mockedCreateTaskUseCase.execute.mockRejectedValueOnce(expectedError)

      await sut.create(createTaskDto, fakeRequest).catch((error) => {
        expect(error).toBe(expectedError)
      })
    })

    it('should return a Task on success', async () => {
      const createTaskDto = {
        title: 'any_title',
        dueDate: new Date(),
        description: 'any_description',
        status: TaskStatus.PENDING,
      }
      const expectedResponse = fakeTask

      const actualResponse = await sut.create(createTaskDto, fakeRequest)

      expect(actualResponse).toEqual(expectedResponse)
    })
  })

  describe('list()', () => {
    it('should call ListTaskUseCase with correct command if status on query is undefined', async () => {
      const expectedCommand = { userId: fakeUserId }
      await sut.list(fakeRequest, { status: undefined })

      expect(mockedListTasksUseCase.execute).toHaveBeenCalledTimes(1)
      expect(mockedListTasksUseCase.execute).toHaveBeenCalledWith(
        expectedCommand,
      )
    })

    it('should call ListTaskUseCase with correct command if status on query is defined', async () => {
      const expectedCommand = { userId: fakeUserId, status: TaskStatus.PENDING }
      await sut.list(fakeRequest, { status: TaskStatus.PENDING })

      expect(mockedListTasksUseCase.execute).toHaveBeenCalledTimes(1)
      expect(mockedListTasksUseCase.execute).toHaveBeenCalledWith(
        expectedCommand,
      )
    })

    it('should throw if ListTaskUseCase throws', async () => {
      const expectedError = new Error('list-error')
      mockedListTasksUseCase.execute.mockRejectedValueOnce(expectedError)

      await sut.list(fakeRequest, { status: undefined }).catch((error) => {
        expect(error).toBe(expectedError)
      })
    })

    it('should return a list of Tasks on success', async () => {
      const expectedResponse = [fakeTask]

      const actualResponse = await sut.list(fakeRequest, { status: undefined })

      expect(actualResponse).toEqual(expectedResponse)
    })
  })

  describe('update()', () => {
    it('should call UpdateTaskUseCase correctly', async () => {
      const updateTaskDto = {
        title: 'any_title',
        dueDate: new Date(),
        description: 'any_description',
        status: TaskStatus.PENDING,
      }

      await sut.update(updateTaskDto, fakeTask.id, fakeRequest)

      expect(mockedUpdateTasksUseCase.execute).toHaveBeenCalledTimes(1)
      expect(mockedUpdateTasksUseCase.execute).toHaveBeenCalledWith({
        ...updateTaskDto,
        userId: fakeRequest.user.sub,
        id: fakeTask.id,
      })
    })

    it('should throw if UpdateTaskUseCase throws', async () => {
      const updateTaskDto = {
        title: 'any_title',
        dueDate: new Date(),
        description: 'any_description',
        status: TaskStatus.PENDING,
      }

      const expectedError = new Error('update-error')
      mockedUpdateTasksUseCase.execute.mockRejectedValueOnce(expectedError)

      await sut
        .update(updateTaskDto, fakeTask.id, fakeRequest)
        .catch((error) => {
          expect(error).toBe(expectedError)
        })
    })

    it('should return a Task on success', async () => {
      const createTaskDto = {
        title: 'any_title',
        dueDate: new Date(),
        description: 'any_description',
        status: TaskStatus.PENDING,
      }
      const expectedResponse = fakeTask

      const actualResponse = await sut.create(createTaskDto, fakeRequest)

      expect(actualResponse).toEqual(expectedResponse)
    })
  })

  describe('delete()', () => {
    it('should call DeleteTaskUseCase correctly', async () => {
      await sut.delete(fakeTask.id, fakeRequest)

      expect(mockedDeleteTaskUseCase.execute).toHaveBeenCalledTimes(1)
      expect(mockedDeleteTaskUseCase.execute).toHaveBeenCalledWith({
        userId: fakeRequest.user.sub,
        id: fakeTask.id,
      })
    })

    it('should throw if DeleteTaskUseCase throws', async () => {
      const expectedError = new Error('delete-error')
      mockedDeleteTaskUseCase.execute.mockRejectedValueOnce(expectedError)

      await sut.delete(fakeTask.id, fakeRequest).catch((error) => {
        expect(error).toBe(expectedError)
      })
    })
  })
})
