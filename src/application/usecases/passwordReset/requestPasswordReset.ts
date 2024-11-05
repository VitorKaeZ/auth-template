import { UserDataLoginRequest } from '../../../domain/entities/user/user-data'
import { Either } from '../../../shared/either'
import { InvalidEmailError } from '../../../domain/entities/user/errors/invalid.email'
import { UserDataLoginResponse } from '../../../domain/entities/user/user-data'
import { InvalidPasswordError } from '../../../domain/entities/user/errors/invalid.password'

export interface RequestPasswordResetInterface {
    email: string, 
}

export type ReqPasswordResetResponse = Either<InvalidEmailError | InvalidPasswordError, RequestPasswordResetInterface>


export interface RequestPasswordReset {
    reqPasswordResetOnService: (password: RequestPasswordResetInterface) => Promise<ReqPasswordResetResponse>
}