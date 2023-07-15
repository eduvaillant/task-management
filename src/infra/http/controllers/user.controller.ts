import { Body, ConflictException, Controller, Post } from '@nestjs/common'
import { CreateUserUseCase } from '../../../domain/use-cases/user/create/create-user.use-case'
import { CreateUserDto } from '../dtos'
import { ConflictError } from 'src/domain/errors'

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.createUserUseCase.execute(createUserDto)
    } catch (error) {
      if (error instanceof ConflictError) {
        throw new ConflictException(error.messages)
      } else throw error
    }
  }
}
