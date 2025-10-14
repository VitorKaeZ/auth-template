import { AuthenticateUserWithGoogle } from "../../application/usecases/userLogin/login-user-with-oauth-on-service";
import { PrismaUserRepository } from "../../infrastructure/db/repositories/PrismaUserRepository";
import { GoogleOAuthService } from "../../infrastructure/gateways/oauth/google-auth-service";
import { AuthenticateUserWithGoogleController } from "../controllers/authenticate-user-with-google.controller";


export const makeLoginUserWithOAuthController = (): AuthenticateUserWithGoogleController => {
    const google_client_id = process.env.GOOGLE_CLIENT_ID || 'SEU_CLIENT_ID'
    const google_secret_id = process.env.GOOGLE_SECRET_ID || 'SEU_CLIENT_SECRET'
    const googleOAuthService = new GoogleOAuthService(google_client_id, google_secret_id , `http://localhost:${process.env.PORT}/auth/google/callback`);
    const prismaUserRepository = new PrismaUserRepository()

    const authenticateUserWithGoogle = new AuthenticateUserWithGoogle(googleOAuthService, prismaUserRepository);
    const authenticateUserWithGoogleController = new AuthenticateUserWithGoogleController(authenticateUserWithGoogle);
    
    return authenticateUserWithGoogleController
}