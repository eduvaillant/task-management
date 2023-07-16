import { Task } from 'src/domain/entities/task/task.entity'
import { TaskStatus } from 'src/domain/enums'

export interface TaskRepository {
  create(task: Task): Promise<void>
  list(userId: string): Promise<Task[]>
  listByStatus(status: TaskStatus): Promise<Task[]>
  findById(id: string): Promise<Task>
  update(task: Task): Promise<void>
  delete(id: string): Promise<void>
}
