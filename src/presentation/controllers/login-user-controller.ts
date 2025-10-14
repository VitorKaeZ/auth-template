
import { HttpRequest, HttpResponse } from "./ports/http";
import { badRequest, ok, serverError, unauthorized } from "./helpers/http.helpers";
import { MissingParamError } from "./errors/missing-params.error";
import { LoginUser, LoginUserResponse } from "../../application/usecases/userLogin/login-user";
import { LoginRequestDTO } from "../../application/dtos/auth/login.dto";

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

            const userData: LoginRequestDTO = { email : httpRequest.body.email, password : httpRequest.body.password}
            const loginUserResponse: LoginUserResponse = await this.loginUser.loginUserOnService(userData)

            if (loginUserResponse.isLeft()) {
                return unauthorized(loginUserResponse.value)
            }
            
            return ok(loginUserResponse.value)
        } catch (error) {
            return serverError('An internal server error occurred.')
        }
    }
}

