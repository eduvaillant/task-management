import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

import { PrismaHelper } from './infra/db/prisma/helpers'
import {
  PrismaTaskRepository,
  PrismaUserRepository,
} from './infra/db/prisma/repositories'
import {
  CreateTaskUseCase,
  CreateUserUseCase,
  ListTasksUseCase,
  LoginUseCase,
  UpdateTaskUseCase,
} from './domain/use-cases'
import { BcryptAdapter } from './infra/adapters'
import { TaskController, UserController } from './infra/http/controllers'
import env from './common/config/env'
import { DeleteTaskUseCase } from './domain/use-cases/task/delete/delete-task.use-case'

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: env.jwtSecret,
      signOptions: { expiresIn: env.jwtExpirationInSeconds },
    }),
  ],
  providers: [
    PrismaHelper,
    CreateUserUseCase,
    CreateTaskUseCase,
    ListTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    LoginUseCase,
    { provide: 'UserRepository', useClass: PrismaUserRepository },
    { provide: 'TaskRepository', useClass: PrismaTaskRepository },
    { provide: 'Hasher', useClass: BcryptAdapter },
  ],
  controllers: [UserController, TaskController],
  exports: [],
})
export class AppModule {}
