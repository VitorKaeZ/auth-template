import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { adaptRoute } from "../adapters/fastify.route.adapter";
import { makeRegisterUserController } from "../factories/register";

export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post("/signup", adaptRoute(makeRegisterUserController()))
}