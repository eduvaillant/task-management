import { Task } from 'src/domain/entities/task/task.entity'

export interface TaskRepository {
  create(task: Task): Promise<void>
  list(userId: string): Promise<Task[]>
}
