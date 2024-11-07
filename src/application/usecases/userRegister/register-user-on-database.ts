import { UserData } from "../../../domain/entities/user/user-data";
import { User } from "../../../domain/entities/user/user";
import { Either, left, right } from "../../../shared/either";
import { InvalidNameError } from "../../../domain/entities/user/errors/invalid.name";
import { InvalidEmailError } from "../../../domain/entities/user/errors/invalid.email";
import { InvalidPasswordError } from "../../../domain/entities/user/errors/invalid.password";
import { database } from "../../../database/prisma-client";
import bcrypt from "bcryptjs"
import { RegisterUserResponse, RegisterUser } from "./register-user";
import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import { EmailAlreadyExistsError } from "../errors/email-exists-error";
import { UserDataCreateResponse } from "../../../domain/entities/user/user-data";


export class RegisterUserOnDatabase implements RegisterUser{
    private userRepository: IUserRepository
    constructor(userRepo: IUserRepository){
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
        
        const response: UserDataCreateResponse = {
            email : user.email.value,
            firstname : user.firstname.value,
            lastname : user.lastname.value
        }
    
        return right(response)
    }
}

