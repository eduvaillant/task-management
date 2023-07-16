import { Injectable } from '@nestjs/common'
import { Task } from 'src/domain/entities'
import { TaskRepository } from 'src/domain/interfaces'
import { PrismaHelper } from '../helpers'

@Injectable()
export class PrismTaskRepository implements TaskRepository {
  constructor(private prismaHelper: PrismaHelper) {}

  async create(task: Task): Promise<void> {
    await this.prismaHelper.task.create({
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        userId: task.userId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
    })
  }
}
