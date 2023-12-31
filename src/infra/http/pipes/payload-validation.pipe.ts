import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

Injectable()
export class ValidatePayloadExistsPipe implements PipeTransform {
  transform(payload: any): any {
    if (!Object.keys(payload).length) {
      throw new BadRequestException('payload should not be empty')
    }

    return payload
  }
}
