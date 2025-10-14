import { RegisterUserOnDatabase } from "../../application/usecases/userRegister/register-user-on-database"
import { PrismaUserRepository } from "../../infrastructure/db/repositories/PrismaUserRepository"
import { RegisterUserController } from "../controllers/register-user-controller"



export const makeRegisterUserController = (): RegisterUserController => {
    const prismaUserRepository = new PrismaUserRepository()
    const registerUserOnDatabase = new RegisterUserOnDatabase(prismaUserRepository)
    const registerUserController = new RegisterUserController(registerUserOnDatabase)
    
    return registerUserController
}