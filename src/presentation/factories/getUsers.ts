import { GetUsers } from "../../application/usecases/getUsers/getUsersOnService";
import { PrismaUserRepository } from "../../infrastructure/db/repositories/PrismaUserRepository";
import { GetUsersController } from "../controllers/getUsersController";

export const makeGetUsersController = (): GetUsersController => {
    const userRepository = new PrismaUserRepository()
    const getUsers = new GetUsers(userRepository)
    const getUsersController = new GetUsersController(getUsers)

    return getUsersController
}