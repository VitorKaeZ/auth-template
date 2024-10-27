import { LoginUserController } from "../../interfaces/controllers/login-user-controller"
import { PrismaUserRepository } from "../../infrastructure/repositories/prisma-user-repository"
import { LoginUserOnService } from "../../application/usecases/user/login-user-on-service"


export const makeLoginUserController = (): LoginUserController => {
    const prismaUserRepository = new PrismaUserRepository()
    const loginUserOnService = new LoginUserOnService(prismaUserRepository)
    const loginUserController = new LoginUserController(loginUserOnService)
    
    return loginUserController
}