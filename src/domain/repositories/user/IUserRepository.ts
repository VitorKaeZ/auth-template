import { OAuthUserResponseDTO } from '../../../application/dtos/auth/oauth.dto'
import { UserDTO } from '../../../application/dtos/user/user.dto'
import { RegisterUserResponse } from '../../../application/usecases/userRegister/register-user'
import { User } from '@prisma/client'

export interface IUserRepository {
  count(): Promise<number>;
  findAllUsers: () => Promise<UserDTO[]>;
  findUserByEmail: (email: string) => Promise<UserDTO | null>
  create: (user: UserDTO, roleName?: string) => Promise<User>;
  exists: (email: string) => Promise<boolean>
  updatePassword(userId: string, newPassword: string): Promise<void>;
  findUserByGoogleId(googleId: string): Promise<OAuthUserResponseDTO | null>;
}

