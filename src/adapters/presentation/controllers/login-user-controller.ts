
import { HttpRequest, HttpResponse } from "./ports/http";
import { badRequest, ok, serverError, unauthorized } from "./helpers/http.helpers";
import { MissingParamError } from "./errors/missing-params.error";
import { LoginUser } from "../../../usecases/user/login-user";
import { LoginUserResponse } from "../../../usecases/user/login-user-response";
import { UserDataLoginRequest } from "../../../entities/user/user-data";

export class LoginUserController {

    private readonly loginUser: LoginUser

    constructor (loginUser: LoginUser) {
        this.loginUser = loginUser
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            if ( !httpRequest.body.email || !httpRequest.body.password) {
                const field = !httpRequest.body.email ? 'email' : "password"
                
                return badRequest(new MissingParamError(field));
            }

            const userData: UserDataLoginRequest = { email : httpRequest.body.email, password : httpRequest.body.password}
            const loginUserResponse: LoginUserResponse = await this.loginUser.loginUserOnService(userData)

            if (loginUserResponse.isLeft()) {
                return unauthorized(loginUserResponse.value)
            }
            
            return ok(loginUserResponse)
        } catch (error) {
            return serverError('An internal server error occurred.')
        }
    }
}

