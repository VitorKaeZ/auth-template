import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { adaptRoute } from "../adapters/fastify.route.adapter";
import { makeRegisterUserController } from "../factories/register";
import { makeLoginUserController } from "../factories/login";
import { makePasswordResetController } from "../factories/passwordReset";
import { makeRequestPasswordResetController } from "../factories/requestPasswordReset";
import authenticateJwt from "../middlewares/auth-middleware";

export async function adminRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/", { preHandler: [authenticateJwt("ADMIN"), ] }, async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })
    
}