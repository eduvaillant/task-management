import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'

import { CreateTaskDto } from '../dtos'
import { CreateTaskUseCase } from 'src/domain/use-cases/task/create/create-task.use-case'
import { ListTasksUseCase } from 'src/domain/use-cases/task/list/list-tasks.use-case'
import { AuthGuard } from 'src/common/guards'

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly listTasksUseCase: ListTasksUseCase,
  ) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request) {
    const command = { ...createTaskDto, userId: request.user.sub }
    return await this.createTaskUseCase.execute(command)
  }

  @Get()
  async list(@Req() request) {
    const command = { userId: request.user.sub }
    return await this.listTasksUseCase.execute(command)
  }
}
