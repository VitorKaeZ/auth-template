import { RegisterUserResponse } from './register-user-response'
import { UserData } from '../../entities/user/user-data'

export interface RegisterUser {
    registerUserOnDatabase: (user: UserData) => Promise<RegisterUserResponse>
}