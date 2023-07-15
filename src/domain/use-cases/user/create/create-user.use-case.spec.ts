import { MockProxy, mock } from 'jest-mock-extended'

import { ConflictException } from '@nestjs/common'

import { CreateUserUseCase } from './create-user.use-case'
import { User } from '../../../entities'
import { Hasher, UserRepository } from '../../../interfaces'

describe('CreateUserUseCase', () => {
  let sut: CreateUserUseCase
  let mockedHasher: MockProxy<Hasher>
  let mockedUserRepository: MockProxy<UserRepository>
  let fakeUser: User

  beforeAll(() => {
    mockedHasher = mock()
    mockedUserRepository = mock()
    mockedHasher.hash.mockResolvedValue('any_hash')
    mockedUserRepository.findByUsername.mockResolvedValue(null)
    mockedUserRepository.findByEmail.mockResolvedValue(null)
    fakeUser = User.newUser('any_username', 'any_email@email.com', '1234')
    jest.spyOn(User, 'newUser').mockReturnValue(fakeUser)
  })

  beforeEach(() => {
    sut = new CreateUserUseCase(mockedHasher, mockedUserRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should throw a ConflictError if username and/or email already exists in the database', async () => {
    const expectedError = new ConflictException([
      'username already exists in the database',
      'email already exists in the database',
    ])
    const command = {
      username: 'any_username',
      email: 'any_email@email.com',
      password: '1234',
    }
    mockedUserRepository.findByUsername.mockResolvedValueOnce(fakeUser)
    mockedUserRepository.findByEmail.mockResolvedValueOnce(fakeUser)

    await sut.execute(command).catch((error) => {
      expect(error).toEqual(expectedError)
    })
  })

  it('should call Hasher.hash with correct password', async () => {
    const command = {
      username: 'any_username',
      email: 'any_email@email.com',
      password: '1234',
    }

    await sut.execute(command)

    expect(mockedHasher.hash).toHaveBeenCalledTimes(1)
    expect(mockedHasher.hash).toHaveBeenCalledWith(command.password)
  })

  it('should call UserRepository.create with valid User', async () => {
    const command = {
      username: 'any_username',
      email: 'any_email@email.com',
      password: '1234',
    }

    await sut.execute(command)

    expect(mockedUserRepository.create).toHaveBeenCalledTimes(1)
    expect(mockedUserRepository.create).toHaveBeenCalledWith(fakeUser)
  })

  it('should return a User on success', async () => {
    const command = {
      username: 'any_username',
      email: 'any_email@email.com',
      password: '1234',
    }
    const expectedUser = fakeUser
    delete expectedUser.password

    const actualUser = await sut.execute(command)

    expect(actualUser).toEqual(expectedUser)
  })
})
