import { randomUUID } from 'crypto'

export type UserProps = {
  id: string
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export class User {
  id: string
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date

  private constructor(
    id: string,
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  public static newUser(
    username: string,
    email: string,
    password: string,
  ): User {
    const id = randomUUID()
    const createdAt = new Date()
    const updatedAt = new Date()
    return new User(id, username, email, password, createdAt, updatedAt)
  }

  public static fromDb(props: UserProps): User {
    return new User(
      props.id,
      props.username,
      props.email,
      props.password,
      props.createdAt,
      props.updatedAt,
    )
  }
}
