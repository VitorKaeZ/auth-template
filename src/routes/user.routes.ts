import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { UserUseCase } from "../usecases/user/user.usecase";
import { UserCreate } from "../interfaces/user.interface";
import { UserController } from "../controllers/user.controller";

export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post("/signup", new UserController().create)
}