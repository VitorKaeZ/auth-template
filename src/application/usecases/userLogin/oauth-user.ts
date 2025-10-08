import { OAuthUserDTO } from '../../dtos/auth/oauth.dto'
import { Either } from '../../../shared/either'
import { InvalidEmailError } from '../../../domain/entities/user/errors/invalid.email'

import { InvalidPasswordError } from '../../../domain/entities/user/errors/invalid.password'
import { InvalidOAuthTokenError } from '../../../domain/entities/user/errors/invalid-oauth-token.error'

export type LoginUserWithOAuthResponse = Either<InvalidOAuthTokenError, OAuthUserDTO>


export interface LoginUserWithOAuth {
    execute: (authCode: string) => Promise<LoginUserWithOAuthResponse>
}