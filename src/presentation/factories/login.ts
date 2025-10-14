import { LoginUserOnService } from "../../application/usecases/userLogin/login-user-on-service"
import { PrismaUserRepository } from "../../infrastructure/db/repositories/PrismaUserRepository"
import { LoginUserController } from "../controllers/login-user-controller"


export const makeLoginUserController = (): LoginUserController => {
    const prismaUserRepository = new PrismaUserRepository()
    const loginUserOnService = new LoginUserOnService(prismaUserRepository)
    const loginUserController = new LoginUserController(loginUserOnService)
    
    return loginUserController
}