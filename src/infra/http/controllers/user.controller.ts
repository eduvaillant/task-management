import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { CreateUserUseCase } from '../../../domain/use-cases/user/create/create-user.use-case'
import { CreateUserDto } from '../dtos'
import { LoginDto } from '../dtos/login.dto'
import { LoginUseCase } from 'src/domain/use-cases/user/login/login.use-case'

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUserUseCase.execute(createUserDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.loginUseCase.execute(loginDto)
  }
}
