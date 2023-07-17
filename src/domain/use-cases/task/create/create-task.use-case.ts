import { Inject } from '@nestjs/common'

import { CreateTaskCommand, CreateTaskOutput } from './create-task.dto'
import { TaskRepository } from '@/domain/interfaces'
import { Task } from '@/domain/entities'

export class CreateTaskUseCase {
  constructor(
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
  ) {}

  async execute({
    title,
    description,
    dueDate,
    status,
    userId,
  }: CreateTaskCommand): Promise<CreateTaskOutput> {
    const task = Task.newTask(title, description, dueDate, status, userId)
    await this.taskRepository.create(task)
    return task
  }
}
