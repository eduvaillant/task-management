import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MockProxy, mock } from 'jest-mock-extended'

import { LoginUseCase } from './login.use-case'
import { User } from '../../../entities'
import { Hasher, UserRepository } from '../../../interfaces'

describe('LoginUseCase', () => {
  let sut: LoginUseCase
  let mockedHasher: MockProxy<Hasher>
  let mockedUserRepository: MockProxy<UserRepository>
  let mockedJwtService: MockProxy<JwtService>
  let fakeUser: User

  beforeAll(() => {
    mockedHasher = mock()
    mockedUserRepository = mock()
    mockedJwtService = mock()
    fakeUser = User.newUser('any_username', 'any_email@email.com', '1234')
    mockedHasher.compare.mockResolvedValue(true)
    mockedUserRepository.findByUsername.mockResolvedValue(fakeUser)
    mockedJwtService.signAsync.mockResolvedValue('any_token')
    jest.spyOn(User, 'newUser').mockReturnValue(fakeUser)
  })

  beforeEach(() => {
    sut = new LoginUseCase(mockedHasher, mockedUserRepository, mockedJwtService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call UserRepository.findByUsername() with correct username', async () => {
    const command = { username: 'any_username', password: '1234' }

    await sut.execute(command)

    expect(mockedUserRepository.findByUsername).toBeCalledTimes(1)
    expect(mockedUserRepository.findByUsername).toHaveBeenCalledWith(
      command.username,
    )
  })

  it('should throw a NotFoundException if UserRepository.findByUsername() returns null', async () => {
    const command = { username: 'any_username', password: '1234' }
    mockedUserRepository.findByUsername.mockResolvedValueOnce(null)

    await sut.execute(command).catch((error) => {
      expect(mockedUserRepository.findByUsername).toBeCalledTimes(1)
      expect(error).toBeInstanceOf(NotFoundException)
    })
  })

  it('should call Hasher.compare() with correct params', async () => {
    const command = { username: 'any_username', password: '1234' }

    await sut.execute(command)

    expect(mockedHasher.compare).toBeCalledTimes(1)
    expect(mockedHasher.compare).toHaveBeenCalledWith(
      command.password,
      fakeUser.password,
    )
  })

  it('should throw a UnauthorizedException if Hasher.compare() returns false', async () => {
    const command = { username: 'any_username', password: '1234' }
    mockedHasher.compare.mockResolvedValueOnce(false)

    await sut.execute(command).catch((error) => {
      expect(mockedHasher.compare).toBeCalledTimes(1)
      expect(error).toBeInstanceOf(UnauthorizedException)
    })
  })

  it('should call JwtService.signAsync() with correct payload', async () => {
    const expectedPayload = { sub: fakeUser.id, username: fakeUser.username }
    const command = { username: 'any_username', password: '1234' }

    await sut.execute(command)

    expect(mockedJwtService.signAsync).toHaveBeenCalledTimes(1)
    expect(mockedJwtService.signAsync).toHaveBeenCalledWith(expectedPayload)
  })

  it('should return an access token on success', async () => {
    const expectedOutput = { accessToken: 'any_token' }
    const command = { username: 'any_username', password: '1234' }

    const actualOutput = await sut.execute(command)

    expect(actualOutput).toEqual(expectedOutput)
  })
})
