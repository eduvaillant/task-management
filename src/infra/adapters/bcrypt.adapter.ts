import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { Hasher } from '@/domain/interfaces'
import env from '@/config/env'

@Injectable()
export class BcryptAdapter implements Hasher {
  async hash(data: string): Promise<string> {
    return await bcrypt.hash(data, env.hashSalt)
  }

  async compare(data: string, hash: string) {
    return await bcrypt.compare(data, hash)
  }
}
