import { User } from './user.entity'

describe('User', () => {
  it('should create a new User whe call newUser with valid params', () => {
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
})
