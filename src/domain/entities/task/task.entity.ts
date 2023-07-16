import { randomUUID } from 'crypto'
import { TaskStatus } from '../../../domain/enums'

export type TaskProps = {
  id: string
  title: string
  description: string
  dueDate: Date
  status: TaskStatus
  createdAt: Date
  updatedAt: Date
}

export class Task {
  id: string
  title: string
  description: string
  dueDate: Date
  status: TaskStatus
  createdAt: Date
  updatedAt: Date

  private constructor(props: TaskProps) {
    this.id = props.id
    this.title = props.title
    this.description = props.description
    this.dueDate = props.dueDate
    this.status = props.status
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  public static newTask(
    title: string,
    description: string,
    dueDate: Date,
    status: TaskStatus,
  ): Task {
    const id = randomUUID()
    const createdAt = new Date()
    const updatedAt = new Date()
    return new Task({
      id,
      title,
      description: description ?? TaskStatus.CREATED,
      dueDate,
      status,
      createdAt,
      updatedAt,
    })
  }

  public static fromDb(props: TaskProps): Task {
    return new Task(props)
  }

  public update(
    title: string,
    description: string,
    status: TaskStatus,
    dueDate: Date,
  ): void {
    this.title = title
    this.description = description
    this.status = status
    this.dueDate = dueDate
    this.updatedAt = new Date()
  }
}
