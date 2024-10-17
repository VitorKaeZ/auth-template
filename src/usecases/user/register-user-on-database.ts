import { UserData } from "../../interfaces/user.interface";
import { User } from "../../entities/user/user";
import { Either, left, right } from "../../shared/either";
import { InvalidNameError } from "../../entities/user/errors/invalid.name";
import { InvalidEmailError } from "../../entities/user/errors/invalid.email";
import { InvalidPasswordError } from "../../entities/user/errors/invalid.password";
import { database } from "../../database/prisma-client";
import bcrypt from "bcryptjs"
import { RegisterUser } from "./register-user";
import { RegisterUserResponse } from "./register-user-response";
import { UserRepository } from "../ports/user-repository";
import { EmailAlreadyExistsError } from "../errors/email-exists-error";


export class RegisterUserOnDatabase implements RegisterUser{
    private userRepository: UserRepository
    constructor(userRepo: UserRepository){
        this.userRepository = userRepo
    }

    async registerUserOnDatabase(userData: UserData): Promise<RegisterUserResponse> {
        const useOrError: Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, User> = User.create(userData)
        if (useOrError.isLeft()) {
            return left(useOrError.value)
        }

        const user: User = useOrError.value
        const exists = await this.userRepository.exists(user.email.value)

        if (exists) {
            return left(new EmailAlreadyExistsError());
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(user.password.value, salt)

        await this.userRepository.add({ firstname: user.firstname.value, lastname: user.lastname.value, email: user.email.value, password: passwordHash })
        
        return right(userData)
    }
}

