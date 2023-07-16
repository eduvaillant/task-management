import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { MockProxy, mock } from 'jest-mock-extended'
import { randomUUID } from 'crypto'

import { UpdateTaskUseCase } from './update-task.use-case'
import { TaskRepository } from '../../../interfaces'
import { Task } from '../../../entities'
import { TaskStatus } from '../../../enums'

describe('UpdateTaskUseCase', () => {
  let sut: UpdateTaskUseCase
  let mockedTaskRepository: MockProxy<TaskRepository>
  let fakeTask: Task
  let userId: string

  beforeAll(() => {
    userId = randomUUID()
    mockedTaskRepository = mock()
    fakeTask = Task.newTask(
      'any_title',
      'any_description',
      new Date(),
      TaskStatus.CREATED,
      userId,
    )
    mockedTaskRepository.findById.mockResolvedValue(fakeTask)
  })

  beforeEach(() => {
    sut = new UpdateTaskUseCase(mockedTaskRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call TaskRepository.findById() correctly', async () => {
    const command = {
      id: randomUUID(),
      title: 'updated_title',
      description: 'updated_description',
      dueDate: new Date(),
      userId,
    }

    await sut.execute(command)

    expect(mockedTaskRepository.findById).toBeCalledTimes(1)
    expect(mockedTaskRepository.findById).toHaveBeenCalledWith(command.id)
  })

  it('should throw a NotFoundException if no task was found', async () => {
    const command = {
      id: randomUUID(),
      title: 'updated_title',
      description: 'updated_description',
      dueDate: new Date(),
      userId: randomUUID(),
    }
    mockedTaskRepository.findById.mockResolvedValueOnce(null)

    await sut.execute(command).catch((error) => {
      expect(error).toBeInstanceOf(NotFoundException)
    })
  })

  it('should throw a ForbiddenException if User is not the owner of the task', async () => {
    const command = {
      id: randomUUID(),
      title: 'updated_title',
      description: 'updated_description',
      dueDate: new Date(),
      userId: randomUUID(),
    }

    await sut.execute(command).catch((error) => {
      expect(error).toBeInstanceOf(ForbiddenException)
    })
  })

  it('should call TaskRepository.update() correctly', async () => {
    const expectedTask = fakeTask
    const command = {
      id: randomUUID(),
      title: 'updated_title',
      description: 'updated_description',
      dueDate: new Date(),
      userId,
    }

    await sut.execute(command)

    expect(mockedTaskRepository.update).toBeCalledTimes(1)
    expect(mockedTaskRepository.update).toHaveBeenCalledWith(expectedTask)
  })

  it('should return a Task on success', async () => {
    const expectedTask = fakeTask
    const command = {
      id: randomUUID(),
      title: 'updated_title',
      description: 'updated_description',
      dueDate: new Date(),
      userId,
    }

    const actualTask = await sut.execute(command)

    expect(actualTask).toEqual(expectedTask)
  })
})
