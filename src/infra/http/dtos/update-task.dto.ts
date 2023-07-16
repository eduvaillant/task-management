import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator'

import { TaskStatus } from 'src/domain/enums'

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus

  @IsOptional()
  @IsDateString()
  dueDate: Date
}
