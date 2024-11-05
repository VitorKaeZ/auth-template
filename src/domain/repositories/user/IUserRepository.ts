import { UserData } from '../../entities/user/user-data'
import { RegisterUserResponse } from '../../../application/usecases/userRegister/register-user'

export interface UserRepository {
  findAllUsers: () => Promise<UserData[]>
  findUserByEmail: (email: string) => Promise<UserData | null>
  add: (user: UserData) => Promise<void>
  exists: (email: string) => Promise<boolean>
  updatePassword(userId: string, newPassword: string): Promise<void>;
}

export interface UserRepository2 {
  create(data: UserData): Promise<RegisterUserResponse>;
}

