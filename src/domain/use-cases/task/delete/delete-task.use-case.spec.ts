import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { MockProxy, mock } from 'jest-mock-extended'
import { randomUUID } from 'crypto'

import { DeleteTaskUseCase } from './delete-task.use-case'
import { TaskRepository } from '@/domain/interfaces'
import { Task } from '@/domain/entities'
import { TaskStatus } from '@/domain/enums'

describe('DeleteTaskUseCase', () => {
  let sut: DeleteTaskUseCase
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
      TaskStatus.PENDING,
      userId,
    )
    mockedTaskRepository.findById.mockResolvedValue(fakeTask)
  })

  beforeEach(() => {
    sut = new DeleteTaskUseCase(mockedTaskRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call TaskRepository.findById() correctly', async () => {
    const command = {
      id: randomUUID(),
      userId,
    }

    await sut.execute(command)

    expect(mockedTaskRepository.findById).toBeCalledTimes(1)
    expect(mockedTaskRepository.findById).toHaveBeenCalledWith(command.id)
  })

  it('should throw a NotFoundException if no task was found', async () => {
    const command = {
      id: randomUUID(),
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
      userId: randomUUID(),
    }

    await sut.execute(command).catch((error) => {
      expect(error).toBeInstanceOf(ForbiddenException)
    })
  })

  it('should call TaskRepository.delete() correctly', async () => {
    const command = {
      id: randomUUID(),
      userId,
    }

    await sut.execute(command)

    expect(mockedTaskRepository.delete).toBeCalledTimes(1)
    expect(mockedTaskRepository.delete).toHaveBeenCalledWith(command.id)
  })
})
