import { User } from 'src/domain/entities'

export type CreateUserCommand = {
  username: string
  email: string
  password: string
}

export type CreateUserOutput = Omit<User, 'password'>

export const createUserOutputMapper = (user: User) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
})
