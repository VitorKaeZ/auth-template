import { ResetPassword } from "../../application/usecases/passwordReset/passwordResetOnService"
import { PrismaPasswordResetRepository } from "../../infrastructure/db/repositories/PrismaPasswordResetRepository"
import { PrismaUserRepository } from "../../infrastructure/db/repositories/PrismaUserRepository"
import { PasswordResetController } from "../controllers/PasswordResetController"

export const makePasswordResetController = (): PasswordResetController => {
    const prismaUserRepository = new PrismaUserRepository()
    const prismaPasswordResetRepository = new PrismaPasswordResetRepository()
    const passwordResetrOnDatabase = new ResetPassword(prismaUserRepository, prismaPasswordResetRepository)
    const passwordResetController = new PasswordResetController(passwordResetrOnDatabase)
    
    return passwordResetController
}