import { FastifyReply, FastifyRequest } from "fastify";
import { UserUseCase } from "../usecases/user/user.usecase";
import { UserCreate } from "../interfaces/user.interface";

class UserController {

    async create( req: FastifyRequest, reply: FastifyReply) {
        const { firstname, lastname, email, password } = req.body as UserCreate
        const userUseCase = new UserUseCase()

        try {
                  
            const data =  await userUseCase.create({
                firstname,
                lastname,
                email,
                password
            })

            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    }
}

export { UserController }