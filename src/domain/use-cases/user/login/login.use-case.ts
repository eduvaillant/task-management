import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { Hasher, UserRepository } from 'src/domain/interfaces'

export type LoginUseCaseCommand = {
  username: string
  password: string
}

export type LoginUseCaseOutput = {
  accessToken: string
}

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('Hasher') private readonly hasher: Hasher,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async execute({
    username,
    password,
  }: LoginUseCaseCommand): Promise<LoginUseCaseOutput> {
    const user = await this.userRepository.findByUsername(username)
    const isValid = await this.hasher.compare(password, user.password)
    if (!isValid) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.id, username: user.username }
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
