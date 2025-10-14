import { FastifyRequest, FastifyReply } from "fastify"
import { AuthenticateUserWithGoogleController } from "../controllers/authenticate-user-with-google.controller"
import { LoginUserController } from "../controllers/login-user-controller"
import { PasswordResetController } from "../controllers/PasswordResetController"
import { HttpRequest } from "../controllers/ports/http"
import { RegisterUserController } from "../controllers/register-user-controller"
import { RequestPasswordResetController } from "../controllers/RequestPasswordResetController"
import { GetUsers } from "../../application/usecases/getUsers/getUsersOnService"
import { GetUsersController } from "../controllers/getUsersController"

export const adaptRoute = (controller: RegisterUserController | LoginUserController | PasswordResetController | RequestPasswordResetController | AuthenticateUserWithGoogleController | GetUsersController ) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const httpRequest: HttpRequest = {
      query: req.query,
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    reply.status(httpResponse.statusCode).send(httpResponse.body)
  }
}
