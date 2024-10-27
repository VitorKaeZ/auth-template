import { UserData } from './user-data'
import { RegisterUserResponse } from './register-user'

export interface UserRepository {
  findAllUsers: () => Promise<UserData[]>
  findUserByEmail: (email: string) => Promise<UserData | null>
  add: (user: UserData) => Promise<void>
  exists: (email: string) => Promise<boolean>
}

export interface UserRepository {
  create(data: UserData): Promise<RegisterUserResponse>;
}

