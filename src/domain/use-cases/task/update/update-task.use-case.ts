import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { UpdateTaskCommand, UpdateTaskOutput } from './update-task.dto'
import { TaskRepository } from '../../../interfaces'

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
  ) {}

  async execute({
    id,
    userId,
    title,
    description,
    dueDate,
    status,
  }: UpdateTaskCommand): Promise<UpdateTaskOutput> {
    const task = await this.taskRepository.findById(id)
    if (!task) throw new NotFoundException()
    if (task.userId !== userId) throw new ForbiddenException()
    task.update(title, description, status, dueDate)
    await this.taskRepository.update(task)
    return task
  }
}
