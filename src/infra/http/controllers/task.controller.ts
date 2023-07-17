import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common'

import {
  CreateTaksOutputDto,
  CreateTaskDto,
  FilterTaskByStatusDto,
  UpdateTaskDto,
} from '../dtos'
import { CreateTaskUseCase } from 'src/domain/use-cases/task/create/create-task.use-case'
import { ListTasksUseCase } from 'src/domain/use-cases/task/list/list-tasks.use-case'
import { UpdateTaskUseCase } from 'src/domain/use-cases'
import { DeleteTaskUseCase } from 'src/domain/use-cases/task/delete/delete-task.use-case'
import { AuthGuard } from 'src/common/guards'
import { ValidatePayloadExistsPipe } from 'src/common/pipes'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

@Controller('tasks')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly listTasksUseCase: ListTasksUseCase,
    private readonly updateTasksUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The task has been successfully created.',
    type: CreateTaksOutputDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request) {
    const command = { ...createTaskDto, userId: request.user.sub }
    return await this.createTaskUseCase.execute(command)
  }

  @Get()
  @ApiOkResponse({
    description: 'Tasks list.',
    type: CreateTaksOutputDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async list(@Req() request, @Query() { status }: FilterTaskByStatusDto) {
    const command = { userId: request.user.sub }
    if (status) {
      command['status'] = status
    }
    return await this.listTasksUseCase.execute(command)
  }

  @Patch(':id')
  @UsePipes(ValidatePayloadExistsPipe)
  @ApiOkResponse({ description: 'Updated task.', type: CreateTaksOutputDto })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Not Found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async update(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: string,
    @Req() request,
  ) {
    const command = { ...updateTaskDto, userId: request.user.sub, id }
    return await this.updateTasksUseCase.execute(command)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'No content.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Not Found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async delete(@Param('id') id: string, @Req() request) {
    const command = { userId: request.user.sub, id }
    await this.deleteTaskUseCase.execute(command)
  }
}
