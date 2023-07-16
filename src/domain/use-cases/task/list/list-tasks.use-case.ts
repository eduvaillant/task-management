import { Inject, Injectable } from '@nestjs/common'

import { ListTasksCommand, ListTasksOutput } from './list-tasks.dto'
import { TaskRepository } from '../../../interfaces'

@Injectable()
export class ListTasksUseCase {
  constructor(
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
  ) {}
  async execute(command: ListTasksCommand): Promise<ListTasksOutput> {
    return await this.taskRepository.list(command.userId)
  }
}
