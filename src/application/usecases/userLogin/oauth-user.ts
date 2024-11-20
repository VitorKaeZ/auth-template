import { OAuthUserData, UserDataLoginRequest } from '../../../domain/entities/user/user-data'
import { Either } from '../../../shared/either'
import { InvalidEmailError } from '../../../domain/entities/user/errors/invalid.email'
import { UserDataLoginResponse } from '../../../domain/entities/user/user-data'
import { InvalidPasswordError } from '../../../domain/entities/user/errors/invalid.password'
import { InvalidOAuthTokenError } from '../../../domain/entities/user/errors/invalid-oauth-token.error'

export type LoginUserWithOAuthResponse = Either<InvalidOAuthTokenError, OAuthUserData>


export interface LoginUserWithOAuth {
    execute: (authCode: string) => Promise<LoginUserWithOAuthResponse>
}