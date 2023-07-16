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
    LoginUseCase,
    { provide: 'UserRepository', useClass: PrismaUserRepository },
    { provide: 'Hasher', useClass: BcryptAdapter },
  ],
  controllers: [UserController],
  exports: ['UserRepository', 'Hasher'],
})
export class AppModule {}
