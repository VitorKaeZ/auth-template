import { Either } from '../../../shared/either'
import { InvalidEmailError } from '../../../domain/entities/user/errors/invalid.email'
import { InvalidPasswordError } from '../../../domain/entities/user/errors/invalid.password'

export interface RequestPasswordResetInterface {
    email: string, 
}

export type ReqPasswordResetResponse = Either<InvalidEmailError | InvalidPasswordError, RequestPasswordResetInterface>


export interface RequestPasswordReset {
    reqPasswordResetOnService: (password: RequestPasswordResetInterface) => Promise<ReqPasswordResetResponse>
}