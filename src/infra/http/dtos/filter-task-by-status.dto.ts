import { IsEnum, IsOptional } from 'class-validator'

import { TaskStatus } from 'src/domain/enums'

export class FilterTaskByStatusDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus
}
