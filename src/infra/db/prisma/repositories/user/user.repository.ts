import { Injectable } from '@nestjs/common'
import { User } from '@/domain/entities'
import { UserRepository } from '@/domain/interfaces'
import { PrismaHelper } from '@/infra/db/prisma/helpers'

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
    const dbUser = await this.prismaHelper.user.findUnique({
      where: { username },
    })
    return dbUser && User.fromDb(dbUser)
  }

  async findByEmail(email: string): Promise<User> {
    const dbUser = await this.prismaHelper.user.findUnique({
      where: { email },
    })
    return dbUser && User.fromDb(dbUser)
  }
}
