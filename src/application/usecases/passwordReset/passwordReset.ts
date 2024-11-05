import { UserDataLoginRequest } from '../../../domain/entities/user/user-data'
import { Either } from '../../../shared/either'
import { InvalidEmailError } from '../../../domain/entities/user/errors/invalid.email'
import { UserDataLoginResponse } from '../../../domain/entities/user/user-data'
import { InvalidPasswordError } from '../../../domain/entities/user/errors/invalid.password'

export interface PasswordResetInterface {
    token: string, 
    newPassword: string
}

export type PasswordResetResponse = Either<InvalidEmailError | InvalidPasswordError, { message: string }>


export interface PasswordReset {
    passwordResetOnService: (password: PasswordResetInterface) => Promise<PasswordResetResponse>
}