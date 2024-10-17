import { User, UserCreate, UserRepository } from "../../interfaces/user.interface";
import { UserRepositoryDatabase } from "../../repositories/user.repository";


class UserUseCase {
    private userRepository: UserRepository
    constructor(){
        this.userRepository = new UserRepositoryDatabase()
    }

    async create({firstname, lastname, email, password}: UserCreate): Promise<User> {
        const result = await this.userRepository.create({firstname, lastname, email, password})

        return result
    }
}

export {UserUseCase}