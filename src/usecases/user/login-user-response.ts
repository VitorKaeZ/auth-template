import { Either } from '../../shared/either'
import { InvalidEmailError } from '../../entities/user/errors/invalid.email'
import { InvalidNameError } from '../../entities/user/errors/invalid.name'
import { UserData, UserDataLoginResponse } from '../../entities/user/user-data'
import { InvalidPasswordError } from '../../entities/user/errors/invalid.password'

export type LoginUserResponse = Either<InvalidEmailError | InvalidPasswordError, UserDataLoginResponse>