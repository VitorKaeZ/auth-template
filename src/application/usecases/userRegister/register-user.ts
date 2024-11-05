
import { Either } from '../../../shared/either'
import { InvalidEmailError } from '../../../domain/entities/user/errors/invalid.email'
import { InvalidNameError } from '../../../domain/entities/user/errors/invalid.name'
import { UserData, UserDataCreateResponse } from '../../../domain/entities/user/user-data'
import { InvalidPasswordError } from '../../../domain/entities/user/errors/invalid.password'

export type RegisterUserResponse = Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, UserDataCreateResponse>


export interface RegisterUser {
    registerUserOnDatabase: (user: UserData) => Promise<RegisterUserResponse>
}