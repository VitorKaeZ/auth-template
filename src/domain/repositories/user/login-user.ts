import { UserDataLoginRequest } from './user-data'
import { Either } from '../../../shared/either'
import { InvalidEmailError } from '../../../domain/entities/user/errors/invalid.email'
import { UserDataLoginResponse } from './user-data'
import { InvalidPasswordError } from '../../../domain/entities/user/errors/invalid.password'

export type LoginUserResponse = Either<InvalidEmailError | InvalidPasswordError, UserDataLoginResponse>


export interface LoginUser {
    loginUserOnService: (user: UserDataLoginRequest) => Promise<LoginUserResponse>
}