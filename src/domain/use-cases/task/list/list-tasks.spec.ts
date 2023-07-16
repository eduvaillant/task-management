import { MockProxy, mock } from 'jest-mock-extended'
import { randomUUID } from 'crypto'

import { ListTasksUseCase } from './list-tasks.use-case'
import { TaskRepository } from '../../../interfaces'
import { Task } from '../../../entities'
import { TaskStatus } from '../../../enums'

describe('ListTasksUseCase', () => {
  let sut: ListTasksUseCase
  let mockedTaskRepository: MockProxy<TaskRepository>
  let fakeTask: Task

  beforeAll(() => {
    mockedTaskRepository = mock()
    fakeTask = Task.newTask(
      'any_title',
      'any_description',
      new Date(),
      TaskStatus.CREATED,
      randomUUID(),
    )
    mockedTaskRepository.list.mockResolvedValue([fakeTask])
  })

  beforeEach(() => {
    sut = new ListTasksUseCase(mockedTaskRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should TaskRepository.listByStatus if status is command is not null', async () => {
    const command = {
      userId: randomUUID(),
      status: TaskStatus.IN_PROGRESS,
    }

    await sut.execute(command)

    expect(mockedTaskRepository.listByStatus).toHaveBeenCalledTimes(1)
    expect(mockedTaskRepository.listByStatus).toHaveBeenCalledWith(
      command.status,
    )
  })

  it('should call TaskRepository.list correctly', async () => {
    const command = {
      userId: randomUUID(),
    }

    await sut.execute(command)

    expect(mockedTaskRepository.list).toHaveBeenCalledTimes(1)
    expect(mockedTaskRepository.list).toHaveBeenCalledWith(command.userId)
  })

  it('should return a Task list on success', async () => {
    const expectedTaskList = [fakeTask]
    const command = {
      userId: randomUUID(),
    }

    const actualTaskList = await sut.execute(command)

    expect(actualTaskList).toEqual(expectedTaskList)
  })
})
