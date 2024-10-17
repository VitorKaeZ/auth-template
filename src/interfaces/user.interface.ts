import { Either } from '../shared/either'
import { InvalidEmailError } from '../entities/user/errors/invalid.email'
import { InvalidNameError } from '../entities/user/errors/invalid.name'

export interface UserInterface {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

export interface UserData {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

export interface UserRepository {
    create(data: UserData): Promise<RegisterUserResponse>;
}



export type RegisterUserResponse = Either<InvalidNameError | InvalidEmailError, UserData>

export interface RegisterUser {
    registerUser: (user: UserData) => Promise<RegisterUserResponse>
  }