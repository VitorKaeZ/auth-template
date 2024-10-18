import { RegisterUserController } from '../../adapters/presentation/controllers/register-user-controller'
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { HttpRequest } from '../../adapters/presentation/controllers/ports/http'
import { LoginUserController } from '../../adapters/presentation/controllers/login-user-controller';

export const adaptRoute = (controller: RegisterUserController | LoginUserController) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    reply.status(httpResponse.statusCode).send(httpResponse.body)
  }
}
