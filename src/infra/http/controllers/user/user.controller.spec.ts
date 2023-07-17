import { MockProxy, mock } from 'jest-mock-extended'

import { UserController } from './user.controller'
import { CreateUserUseCase, LoginUseCase } from '@/domain/use-cases'
import { User } from '@/domain/entities'

describe('UserController', () => {
  let sut: UserController
  let mockedCreateUserUseCase: MockProxy<CreateUserUseCase>
  let mockedLoginUseCase: MockProxy<LoginUseCase>
  let fakeUser: User
  let fakeAccessToken: any

  beforeAll(() => {
    mockedCreateUserUseCase = mock()
    mockedLoginUseCase = mock()
    fakeUser = User.newUser(
      'any_username',
      'any_email@email.com',
      'any_password',
    )
    fakeAccessToken = { accessToke: 'any_access_token' }
    mockedCreateUserUseCase.execute.mockResolvedValue(fakeUser)
    mockedLoginUseCase.execute.mockResolvedValue(fakeAccessToken)
  })

  beforeEach(() => {
    sut = new UserController(mockedCreateUserUseCase, mockedLoginUseCase)
  })
  describe('create()', () => {
    it('should call CreateUserUseCase correctly', async () => {
      const createUserDto = {
        username: 'any_username',
        email: 'any_email@email.com',
        password: 'any_password',
      }

      await sut.createUser(createUserDto)

      expect(mockedCreateUserUseCase.execute).toHaveBeenCalledTimes(1)
      expect(mockedCreateUserUseCase.execute).toHaveBeenCalledWith(
        createUserDto,
      )
    })

    it('should throw if CreateUserUseCase throws', async () => {
      const createUserDto = {
        username: 'any_username',
        email: 'any_email@email.com',
        password: 'any_password',
      }
      const expectedError = new Error('create-error')
      mockedCreateUserUseCase.execute.mockRejectedValueOnce(expectedError)

      await sut.createUser(createUserDto).catch((error) => {
        expect(error).toBe(expectedError)
      })
    })

    it('should return a User on success', async () => {
      const createUserDto = {
        username: 'any_username',
        email: 'any_email@email.com',
        password: 'any_password',
      }
      const expectedResponse = fakeUser

      const actualResponse = await sut.createUser(createUserDto)

      expect(actualResponse).toEqual(expectedResponse)
    })
  })

  describe('login()', () => {
    it('should call LoginUseCase correctly', async () => {
      const loginDto = {
        username: 'any_username',
        password: 'any_password',
      }

      await sut.login(loginDto)

      expect(mockedLoginUseCase.execute).toHaveBeenCalledTimes(1)
      expect(mockedLoginUseCase.execute).toHaveBeenCalledWith(loginDto)
    })

    it('should throw if LoginUseCase throws', async () => {
      const loginDto = {
        username: 'any_username',
        password: 'any_password',
      }
      const expectedError = new Error('login-error')
      mockedLoginUseCase.execute.mockRejectedValueOnce(expectedError)

      await sut.login(loginDto).catch((error) => {
        expect(error).toBe(expectedError)
      })
    })

    it('should return a access token on success', async () => {
      const loginDto = {
        username: 'any_username',
        password: 'any_password',
      }
      const expectedResponse = fakeAccessToken

      const actualResponse = await sut.login(loginDto)

      expect(actualResponse).toEqual(expectedResponse)
    })
  })
})
