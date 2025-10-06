import { OAuthUserDataResponse, UserData } from '../../entities/user/user-data'
import { RegisterUserResponse } from '../../../application/usecases/userRegister/register-user'
import { User } from '@prisma/client'

export interface IUserRepository {
  count(): Promise<number>;
  findAllUsers: () => Promise<UserData[]>;
  findUserByEmail: (email: string) => Promise<UserData | null>
  create: (user: UserData, roleName?: string) => Promise<User>;
  exists: (email: string) => Promise<boolean>
  updatePassword(userId: string, newPassword: string): Promise<void>;
  findUserByGoogleId(googleId: string): Promise<OAuthUserDataResponse | null>;
}

