import { Either } from '../../../shared/either'
import { InvalidEmailError } from '../../../domain/entities/user/errors/invalid.email'
import { InvalidPasswordError } from '../../../domain/entities/user/errors/invalid.password'

export interface RequestPasswordResetInterface {
    email: string, 
}
export interface RequestPasswordResetInterfaceResponse {
    message: string, 
}

export type ReqPasswordResetResponse = Either<InvalidEmailError | InvalidPasswordError, RequestPasswordResetInterfaceResponse>


export interface RequestPasswordReset {
    reqPasswordResetOnService: (password: RequestPasswordResetInterface) => Promise<ReqPasswordResetResponse>
}