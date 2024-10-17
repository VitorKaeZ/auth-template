import { User, UserCreate, UserRepository } from "../interfaces/user.interface";

class UserRepositoryDatabase implements UserRepository {
    async create(data: UserCreate): Promise<User> {
        
    }
}

export { UserRepositoryDatabase }