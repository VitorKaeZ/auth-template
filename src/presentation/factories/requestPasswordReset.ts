import { RequestPasswordReset } from "../../application/usecases/passwordReset/requestPasswordResetOnService"
import { NodeMailerService } from "../../infrastructure/gateways/email/NodeMailerService"
import { PrismaPasswordResetRepository } from "../../infrastructure/db/repositories/PrismaPasswordResetRepository"
import { PrismaUserRepository } from "../../infrastructure/db/repositories/PrismaUserRepository"
import { RequestPasswordResetController } from "../controllers/RequestPasswordResetController"

export const makeRequestPasswordResetController = (): RequestPasswordResetController => {
    const prismaUserRepository = new PrismaUserRepository()
    const prismaPasswordResetRepository = new PrismaPasswordResetRepository()
    const emailService = new NodeMailerService()
    const passwordResetrOnDatabase = new RequestPasswordReset(prismaUserRepository, prismaPasswordResetRepository, emailService)
    const passwordResetController = new RequestPasswordResetController(passwordResetrOnDatabase)
    
    return passwordResetController
}