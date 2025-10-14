import { User } from "../../../domain/entities/user/user"
import { IUserRepository } from "../../../domain/repositories/user/IUserRepository"
import { Either, left, right } from "../../../shared/either"
import { UserDTO, UserResponse } from "../../dtos/user/user.dto"

export class GetUsers {
    private userRepository: IUserRepository
    
    constructor(userRepo: IUserRepository){
        this.userRepository = userRepo
    }

    async execute(): Promise<Either<Error, {users: UserResponse[]}>> {
        const usersData = await this.userRepository.findAllUsers()

        if (!usersData) {
            return left(new Error('Users not found'))
        }


        console.log(usersData)
        const users: UserResponse[] = usersData.map(user => ({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            roles: user.roles.map(userRole => userRole.role.name)
        }))



        return right({users: users})

    }
}