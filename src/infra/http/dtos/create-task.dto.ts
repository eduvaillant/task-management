import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import { TaskStatus } from '@/domain/enums'

export class CreateTaskDto {
  @ApiProperty({ example: 'A title' })
  @IsNotEmpty()
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

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dueDate: Date
}

export class CreateTaksOutputDto {
  @ApiProperty({ example: '680412a0-d720-4163-88dc-14858b2b7963' })
  id: string

  @ApiProperty({ example: 'A title' })
  title: string

  @ApiProperty({ example: 'A description' })
  description: string

  @ApiProperty()
  dueDate: Date

  @ApiProperty({ enum: TaskStatus })
  status: TaskStatus

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty({ example: '680412a0-d720-4163-88dc-14858b2b7963' })
  userId: string
}
