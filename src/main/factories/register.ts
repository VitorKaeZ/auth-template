import { RegisterUserController } from "../../adapters/presentation/controllers/register-user-controller"
import { PrismaUserRepository } from "../../external/prisma-user-repository"
import { RegisterUserOnDatabase } from "../../usecases/user/register-user-on-database"


export const makeRegisterUserController = (): RegisterUserController => {
    const prismaUserRepository = new PrismaUserRepository()
    const registerUserOnDatabase = new RegisterUserOnDatabase(prismaUserRepository)
    const registerUserController = new RegisterUserController(registerUserOnDatabase)
    
    return registerUserController
}