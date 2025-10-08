import { LoginRequestDTO, LoginResponseDTO } from '../../dtos/auth/login.dto'
import { InvalidPasswordError } from '../../../domain/entities/user/errors/invalid.password'

export type LoginUserResponse = Either<InvalidEmailError | InvalidPasswordError, LoginResponseDTO>


export interface LoginUser {
    loginUserOnService: (user: LoginRequestDTO) => Promise<LoginUserResponse>
}