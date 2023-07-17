import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { DeleteTaskCommand } from './delete-task.dto'
import { TaskRepository } from '@/domain/interfaces'

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
  ) {}

  async execute({ id, userId }: DeleteTaskCommand): Promise<void> {
    const task = await this.taskRepository.findById(id)
    if (!task) throw new NotFoundException()
    if (task.userId !== userId) throw new ForbiddenException()
    await this.taskRepository.delete(id)
  }
}
