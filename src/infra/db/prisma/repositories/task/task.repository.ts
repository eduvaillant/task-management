import { Injectable } from '@nestjs/common'

import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { Task, TaskProps } from '@/domain/entities'
import { TaskRepository } from '@/domain/interfaces'
import { TaskStatus } from '@/domain/enums'

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
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
    return dbTasks.map((dbTask) => Task.fromDb(dbTask as TaskProps))
  }

  async findById(id: string): Promise<Task> {
    const dbTask = await this.prismaHelper.task.findUnique({
      where: { id },
    })
    return dbTask && Task.fromDb(dbTask as TaskProps)
  }

  async update(task: Task): Promise<void> {
    await this.prismaHelper.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        updatedAt: task.updatedAt,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prismaHelper.task.delete({ where: { id } })
  }

  async listByStatus(status: TaskStatus, userId: string): Promise<Task[]> {
    const dbTasks = await this.prismaHelper.task.findMany({
      where: { status, userId },
    })
    return dbTasks.map((dbTask) => Task.fromDb(dbTask as TaskProps))
  }
}
