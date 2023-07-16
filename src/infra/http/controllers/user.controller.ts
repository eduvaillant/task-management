import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { CreateUserUseCase } from '../../../domain/use-cases/user/create/create-user.use-case'
import { CreateUserDto, LoginDto } from '../dtos'
import { LoginUseCase } from 'src/domain/use-cases/user/login/login.use-case'

@Controller()
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.createUserUseCase.execute(createUserDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.loginUseCase.execute(loginDto)
  }
}
