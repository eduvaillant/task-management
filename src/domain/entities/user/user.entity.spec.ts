import { User } from './user.entity'

describe('User', () => {
  it('should instantiate a User when call newUser with valid params', () => {
    const expectedUsername = 'any_valid_name'
    const expectedPassword = 'any_valid_password'
    const expectedEmail = 'any_valid_email@email.com'

    const actualUser = User.newUser(
      expectedUsername,
      expectedEmail,
      expectedPassword,
    )

    expect(actualUser.id).toBeDefined()
    expect(actualUser.username).toBe(expectedUsername)
    expect(actualUser.email).toBe(expectedEmail)
    expect(actualUser.password).toBe(expectedPassword)
    expect(actualUser.createdAt).toBeDefined()
    expect(actualUser.updatedAt).toBeDefined()
  })

  it('should instantiate a User when call fromDb with valid params', () => {
    const expectedId = 'any_id'
    const expectedUsername = 'any_valid_name'
    const expectedPassword = 'any_valid_password'
    const expectedEmail = 'any_valid_email@email.com'
    const expectedCreatedAt = new Date()
    const expectedUpdatedAt = new Date()

    const actualUser = User.fromDb({
      id: expectedId,
      username: expectedUsername,
      password: expectedPassword,
      email: expectedEmail,
      createdAt: expectedCreatedAt,
      updatedAt: expectedUpdatedAt,
    })

    expect(actualUser.id).toBeDefined()
    expect(actualUser.username).toBe(expectedUsername)
    expect(actualUser.email).toBe(expectedEmail)
    expect(actualUser.password).toBe(expectedPassword)
    expect(actualUser.createdAt).toBe(expectedCreatedAt)
    expect(actualUser.updatedAt).toBe(expectedUpdatedAt)
  })
})
