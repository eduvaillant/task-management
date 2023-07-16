import { Injectable } from '@nestjs/common'
import { User } from 'src/domain/entities'
import { UserRepository } from 'src/domain/interfaces'
import { PrismaHelper } from '../helpers'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaHelper: PrismaHelper) {}

  async create(user: User): Promise<void> {
    await this.prismaHelper.user.create({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  }

  async findByUsername(username: string): Promise<User> {
    const dbUser = await this.prismaHelper.user.findFirst({
      where: { username },
    })
    return dbUser && User.fromDb(dbUser)
  }

  async findByEmail(email: string): Promise<User> {
    const dbUser = await this.prismaHelper.user.findFirst({
      where: { email },
    })
    return dbUser && User.fromDb(dbUser)
  }
}
