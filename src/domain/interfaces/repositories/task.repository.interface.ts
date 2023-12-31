import { Task } from '@/domain/entities/task/task.entity'
import { TaskStatus } from '@/domain/enums'

export interface TaskRepository {
  create(task: Task): Promise<void>
  list(userId: string): Promise<Task[]>
  listByStatus(status: TaskStatus, userId: string): Promise<Task[]>
  findById(id: string): Promise<Task>
  update(task: Task): Promise<void>
  delete(id: string): Promise<void>
}
