import { User } from '../../entities'

export interface UserRepository {
  create(user: User): Promise<void>
  findByUsername(username: string): Promise<User>
  findByEmail(email: string): Promise<User>
}
