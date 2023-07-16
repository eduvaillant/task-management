import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'

import { CreateTaskDto } from '../dtos'
import { CreateTaskUseCase } from 'src/domain/use-cases/task/create/create-task.use-case'
import { AuthGuard } from 'src/common/guards'

@Controller('tasks')
export class TaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request) {
    const command = { ...createTaskDto, userId: request.user.sub }
    return await this.createTaskUseCase.execute(command)
  }
}
