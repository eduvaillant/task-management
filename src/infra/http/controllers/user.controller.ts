import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { CreateUserUseCase } from '../../../domain/use-cases/user/create/create-user.use-case'
import {
  CreateUserDto,
  CreateUserOutputDto,
  LoginDto,
  LoginOutputDto,
} from '../dtos'
import { LoginUseCase } from 'src/domain/use-cases/user/login/login.use-case'

@Controller()
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('users')
  @ApiTags('users')
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: CreateUserOutputDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiConflictResponse({ description: 'Conflict.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.createUserUseCase.execute(createUserDto)
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiTags('login')
  @ApiOkResponse({
    description: 'The token has been genereted.',
    type: LoginOutputDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async login(@Body() loginDto: LoginDto) {
    return await this.loginUseCase.execute(loginDto)
  }
}
