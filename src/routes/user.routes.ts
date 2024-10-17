import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";

export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.post("/signup", async (req: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })
}