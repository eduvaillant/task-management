import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'

import { TaskStatus } from 'src/domain/enums'

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
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
