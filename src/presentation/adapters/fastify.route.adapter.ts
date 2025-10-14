import { RegisterUserController } from '../../../presentation/controllers/register-user-controller'
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { HttpRequest } from '../../../presentation/controllers/ports/http'
import { LoginUserController } from '../../../presentation/controllers/login-user-controller';
import { PasswordResetController } from '../../../presentation/controllers/PasswordResetController';
import { RequestPasswordResetController } from '../../../presentation/controllers/RequestPasswordResetController';
import { AuthenticateUserWithGoogleController } from '../../../presentation/controllers/authenticate-user-with-google.controller';

export const adaptRoute = (controller: RegisterUserController | LoginUserController | PasswordResetController | RequestPasswordResetController | AuthenticateUserWithGoogleController ) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const httpRequest: HttpRequest = {
      query: req.query,
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    reply.status(httpResponse.statusCode).send(httpResponse.body)
  }
}
