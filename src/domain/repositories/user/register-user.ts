
import { Either } from '../../../shared/either'
import { InvalidEmailError } from '../../entities/user/errors/invalid.email'
import { InvalidNameError } from '../../entities/user/errors/invalid.name'
import { UserData, UserDataCreateResponse } from './user-data'
import { InvalidPasswordError } from '../../entities/user/errors/invalid.password'

export type RegisterUserResponse = Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, UserDataCreateResponse>


export interface RegisterUser {
    registerUserOnDatabase: (user: UserData) => Promise<RegisterUserResponse>
}