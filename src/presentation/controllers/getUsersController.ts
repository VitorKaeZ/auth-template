import { GetUsers } from "../../application/usecases/getUsers/getUsersOnService"
import { badRequest, ok, serverError } from "./helpers/http.helpers"
import { HttpRequest, HttpResponse } from "./ports/http"

export class GetUsersController {
    private readonly getUsers: GetUsers

    constructor (getUsers: GetUsers) {
        this.getUsers = getUsers
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const usersResponse = await this.getUsers.execute()

            console.log(usersResponse)
            if (usersResponse.isLeft()) {
                return badRequest(usersResponse.value)
            }
            
            console.log(usersResponse.value)
            return ok(usersResponse.value)
        } catch (error) {
            return serverError('An internal server error occurred.')
        }
    }

}