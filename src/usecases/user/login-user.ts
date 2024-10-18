import { UserData, UserDataLoginRequest } from '../../entities/user/user-data'
import { LoginUserResponse } from './login-user-response'

export interface LoginUser {
    loginUserOnService: (user: UserDataLoginRequest) => Promise<LoginUserResponse>
}