import { database } from "../database/prisma-client";
import { User, UserCreate, UserRepository } from "../interfaces/user.interface";
import bcrypt from "bcryptjs"

class UserRepositoryDatabase implements UserRepository {
    async create(data: UserCreate): Promise<User> {
        
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(data.password, salt)
            
        
        const result = await database.user.create({
            data: {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: passwordHash
            }
        })
        return result
    }
}

export { UserRepositoryDatabase }