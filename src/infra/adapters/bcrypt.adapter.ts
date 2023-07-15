import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'

import { Hasher } from 'src/domain/interfaces'

@Injectable()
export class BcryptAdapter implements Hasher {
  async hash(data: string): Promise<string> {
    return await bcrypt.hash(data, 10)
  }

  async compare(data: string, hash: string) {
    return await bcrypt.compare(data, hash)
  }
}
