import { randomUUID } from 'crypto'

export class User {
  id: string
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date

  private constructor(
    anId: string,
    anUsername: string,
    anEmail: string,
    aPassword: string,
    aCreateDate: Date,
    anUpdateDate: Date,
  ) {
    this.id = anId
    this.username = anUsername
    this.email = anEmail
    this.password = aPassword
    this.createdAt = aCreateDate
    this.updatedAt = anUpdateDate
  }

  public static newUser(
    anUsername: string,
    anEmail: string,
    aPassword: string,
  ) {
    const anId = randomUUID()
    const aCreateDate = new Date()
    const aUpdateDate = new Date()
    return new User(
      anId,
      anUsername,
      anEmail,
      aPassword,
      aCreateDate,
      aUpdateDate,
    )
  }
  // TODO: Implements notification pattern for validation
}
