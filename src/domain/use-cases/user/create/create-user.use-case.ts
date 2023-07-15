import { Inject, Injectable } from '@nestjs/common'

import { ConflictError } from '../../../errors'
import { User } from '../../../entities'
import { Hasher, UserRepository } from '../../../interfaces'

export type CreateUserCommand = {
  username: string
  email: string
  password: string
}

export type CreateUserOutput = Omit<User, 'password'>

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('Hasher') private readonly hasher: Hasher,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute({
    username,
    email,
    password,
  }: CreateUserCommand): Promise<CreateUserOutput> {
    const conflictMessages = await this.checkConflicts(username, email)
    if (conflictMessages.length > 0) throw new ConflictError(conflictMessages)
    const hashedPassword = await this.hasher.hash(password)
    const user = User.newUser(username, email, hashedPassword)
    await this.userRepository.create(user)
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  private async checkConflicts(
    username: string,
    email: string,
  ): Promise<string[]> {
    const messages = []
    const usernameInDb = await this.userRepository.findByUsername(username)
    if (usernameInDb) messages.push('username already exists in the database')
    const emailInDb = await this.userRepository.findByEmail(email)
    if (emailInDb) messages.push('email already exists in the database')
    return messages
  }
}
