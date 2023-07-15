import { Module } from '@nestjs/common'
import { PrismaHelper } from './infra/db/prisma/helpers'
import { CreateUserUseCase } from './domain/use-cases/user/create/create-user.use-case'
import { PrismaUserRepository } from './infra/db/prisma/repositories/user.repository'
import { UserController } from './infra/http/controllers/user.controller'
import { BcryptAdapter } from './infra/adapters'

@Module({
  providers: [
    PrismaHelper,
    CreateUserUseCase,
    { provide: 'UserRepository', useClass: PrismaUserRepository },
    { provide: 'Hasher', useClass: BcryptAdapter },
  ],
  controllers: [UserController],
  exports: ['UserRepository', 'Hasher'],
})
export class AppModule {}
