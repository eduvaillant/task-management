import { Injectable } from '@nestjs/common'
import { TaskStatus } from '@prisma/client'

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

  async list(userId: string): Promise<Task[]> {
    const dbTasks = await this.prismaHelper.task.findMany({ where: { userId } })
    const mappedTasks = dbTasks.map((dbTask) => {
      let taskProps
      switch (dbTask.status) {
        case 'COMPLETED':
          taskProps = { ...dbTask, status: TaskStatus.COMPLETED }
          break
        case 'IN_PROGRESS':
          taskProps = { ...dbTask, status: TaskStatus.IN_PROGRESS }
          break
        case 'COMPLETED':
          taskProps = { ...dbTask, status: TaskStatus.COMPLETED }
          break
      }
      return Task.fromDb(taskProps)
    })
    return mappedTasks
  }
}
