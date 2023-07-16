import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { Hasher, UserRepository } from 'src/domain/interfaces'
import { LoginUseCaseCommand, LoginUseCaseOutput } from './login.dto'

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
    if (!user) throw new NotFoundException('user not found')
    const isValid = await this.hasher.compare(password, user.password)
    if (!isValid) throw new UnauthorizedException()
    return {
      accessToken: await this.jwtService.signAsync({
        sub: user.id,
        username: user.username,
      }),
    }
  }
}
