import { MockProxy, mock } from 'jest-mock-extended'

import { CreateTaskUseCase } from './create-task.use-case'
import { TaskRepository } from '../../../interfaces'
import { Task } from '../../../entities'
import { TaskStatus } from '../../../enums'
import { randomUUID } from 'crypto'

describe('CreateTaskUseCase', () => {
  let sut: CreateTaskUseCase
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
    jest.spyOn(Task, 'newTask').mockReturnValue(fakeTask)
  })

  beforeEach(() => {
    sut = new CreateTaskUseCase(mockedTaskRepository)
  })

  it('should call TaskRepository.create correctly', async () => {
    const command = {
      title: 'any_title',
      description: 'any_description',
      dueDate: new Date(),
      status: TaskStatus.CREATED,
      userId: randomUUID(),
    }

    await sut.execute(command)

    expect(mockedTaskRepository.create).toHaveBeenCalledTimes(1)
    expect(mockedTaskRepository.create).toHaveBeenCalledWith(fakeTask)
  })

  it('should return a Task on success', async () => {
    const expectedTask = fakeTask
    const command = {
      title: 'any_title',
      description: 'any_description',
      dueDate: new Date(),
      status: TaskStatus.CREATED,
      userId: randomUUID(),
    }

    const actualTask = await sut.execute(command)

    expect(actualTask).toEqual(expectedTask)
  })
})
