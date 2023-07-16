import { ForbiddenException } from '@nestjs/common'

import { UpdateTaskCommand, UpdateTaskOutput } from './update-task.dto'
import { TaskRepository } from '../../../interfaces'

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    id,
    userId,
    title,
    description,
    dueDate,
    status,
  }: UpdateTaskCommand): Promise<UpdateTaskOutput> {
    const task = await this.taskRepository.findById(id)
    if (task.userId !== userId) throw new ForbiddenException()
    task.update(title, description, status, dueDate)
    await this.taskRepository.update(task)
    return task
  }
}
