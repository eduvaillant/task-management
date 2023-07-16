import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

import { TaskStatus } from 'src/domain/enums'

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date
}
