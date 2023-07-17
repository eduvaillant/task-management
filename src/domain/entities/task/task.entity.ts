import { randomUUID } from 'crypto'

import { TaskStatus } from '../../../domain/enums'

export type TaskProps = {
  id: string
  title: string
  description: string
  dueDate: Date
  status: TaskStatus
  userId: string
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
  userId: string

  private constructor(props: TaskProps) {
    this.id = props.id
    this.title = props.title
    this.description = props.description
    this.dueDate = props.dueDate
    this.status = props.status
    this.userId = props.userId
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  public static newTask(
    title: string,
    description: string,
    dueDate: Date,
    status: TaskStatus,
    userId: string,
  ): Task {
    const id = randomUUID()
    const createdAt = new Date()
    const updatedAt = new Date()
    return new Task({
      id,
      title,
      description: description ?? '',
      dueDate,
      status: status ?? TaskStatus.PENDING,
      userId,
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
    this.title = title ?? this.title
    this.description = description ?? this.description
    this.status = status ?? this.status
    this.dueDate = dueDate ?? this.dueDate
    this.updatedAt = new Date()
  }
}
