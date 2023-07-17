import { MockProxy, mock, mockReset } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'

import { PrismaUserRepository } from './user.repository'
import { User } from '../../../../../domain/entities'

describe('PrismaUserRepository', () => {
  let sut: PrismaUserRepository
  let mockedPrismaHelper: any
  let fakeUser: User

  beforeAll(() => {
    fakeUser = User.newUser(
      'any_username',
      'any_email@email.com',
      'any_password',
    )
    mockedPrismaHelper = mock()
    const userPrismaMock: MockProxy<
      Pick<PrismaClient['user'], 'findUnique' | 'create'>
    > = mock()
    mockedPrismaHelper['user'] = userPrismaMock
  })

  beforeEach(() => {
    sut = new PrismaUserRepository(mockedPrismaHelper)
    mockedPrismaHelper.user.findUnique.mockResolvedValue(fakeUser)
  })

  afterEach(() => {
    mockReset(mockedPrismaHelper)
  })

  describe('create()', () => {
    it('should create a new User', async () => {
      const expectedInput = { data: fakeUser }

      await sut.create(fakeUser)

      expect(mockedPrismaHelper.user.create).toHaveBeenCalledTimes(1)
      expect(mockedPrismaHelper.user.create).toHaveBeenCalledWith(expectedInput)
    })

    it('should throw if prismaHelper.create() throws', async () => {
      const expectedError = new Error('create-error')

      mockedPrismaHelper.user.create.mockRejectedValueOnce(expectedError)

      await sut.create(fakeUser).catch((error) => {
        expect(error).toBe(expectedError)
      })
    })
  })

  describe('findByEmail()', () => {
    it('should find a user by email', async () => {
      const email = 'any_email@email.com'
      const expectedInput = { where: { email } }

      await sut.findByEmail(email)

      expect(mockedPrismaHelper.user.findUnique).toHaveBeenCalledTimes(1)
      expect(mockedPrismaHelper.user.findUnique).toHaveBeenCalledWith(
        expectedInput,
      )
    })

    it('should throw if prismaHelper.findUnique() throws', async () => {
      const expectedError = new Error('find-error')

      mockedPrismaHelper.user.findUnique.mockRejectedValueOnce(expectedError)

      await sut.create(fakeUser).catch((error) => {
        expect(error).toBe(expectedError)
      })
    })

    it('should return a User on success', async () => {
      const expectedUser = fakeUser

      const actualUser = await sut.findByUsername('any_username')

      expect(actualUser).toEqual(expectedUser)
    })
  })

  describe('findByUsername()', () => {
    it('should find a user by username', async () => {
      const username = 'any_username'
      const expectedInput = { where: { username } }

      await sut.findByUsername(username)

      expect(mockedPrismaHelper.user.findUnique).toHaveBeenCalledTimes(1)
      expect(mockedPrismaHelper.user.findUnique).toHaveBeenCalledWith(
        expectedInput,
      )
    })

    it('should throw if prismaHelper.findUnique() throws', async () => {
      const expectedError = new Error('find-error')

      mockedPrismaHelper.user.findUnique.mockRejectedValueOnce(expectedError)

      await sut.create(fakeUser).catch((error) => {
        expect(error).toBe(expectedError)
      })
    })

    it('should return a User on success', async () => {
      const expectedUser = fakeUser

      const actualUser = await sut.findByUsername('any_username')

      expect(actualUser).toEqual(expectedUser)
    })
  })
})
