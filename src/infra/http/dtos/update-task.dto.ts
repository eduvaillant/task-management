import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator'

import { TaskStatus } from 'src/domain/enums'

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'A title' })
  @IsOptional()
  @IsString()
  title: string

  @ApiPropertyOptional({ example: 'A description' })
  @IsOptional()
  @IsString()
  description: string

  @ApiPropertyOptional({ enum: TaskStatus })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dueDate: Date
}
