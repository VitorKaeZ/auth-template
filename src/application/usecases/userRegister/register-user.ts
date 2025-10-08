
import { Either } from '../../../shared/either'
import { InvalidEmailError } from '../../../domain/entities/user/errors/invalid.email'
import { InvalidNameError } from '../../../domain/entities/user/errors/invalid.name'
import { UserDTO } from '../../dtos/user/user.dto'
import { CreateUserResponseDTO } from '../../dtos/user/create-user.dto'
import { InvalidPasswordError } from '../../../domain/entities/user/errors/invalid.password'

export type RegisterUserResponse = Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, CreateUserResponseDTO>


export interface RegisterUser {
    registerUserOnDatabase: (user: UserDTO) => Promise<RegisterUserResponse>
}