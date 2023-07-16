import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

import { PrismaHelper } from './infra/db/prisma/helpers'
import { CreateUserUseCase } from './domain/use-cases/user/create/create-user.use-case'
import { PrismaUserRepository } from './infra/db/prisma/repositories/user.repository'
import { UserController } from './infra/http/controllers/user.controller'
import { BcryptAdapter } from './infra/adapters'
import { LoginUseCase } from './domain/use-cases/user/login/login.use-case'
import env from './common/config/env'
import { TaskController } from './infra/http/controllers/task.controller'
import { CreateTaskUseCase } from './domain/use-cases/task/create/create-task.use-case'
import { PrismTaskRepository } from './infra/db/prisma/repositories/task.repository'
import { ListTasksUseCase } from './domain/use-cases/task/list/list-tasks.use-case'

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
    LoginUseCase,
    { provide: 'UserRepository', useClass: PrismaUserRepository },
    { provide: 'TaskRepository', useClass: PrismTaskRepository },
    { provide: 'Hasher', useClass: BcryptAdapter },
  ],
  controllers: [UserController, TaskController],
  exports: ['UserRepository', 'Hasher'],
})
export class AppModule {}
