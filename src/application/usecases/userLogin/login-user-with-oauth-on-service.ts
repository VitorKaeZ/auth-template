// src/application/usecases/oauth/authenticate-user-with-google.ts

import { IOAuthService } from "../../../domain/repositories/user/IOAuthRepository";
import { OAuthUserDTO } from "../../dtos/auth/oauth.dto";
import { Either, left, right } from "../../../shared/either";
import { InvalidOAuthTokenError } from "../../../domain/entities/user/errors/invalid-oauth-token.error";
import { LoginUserWithOAuth } from "./oauth-user";
import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";

export class AuthenticateUserWithGoogle implements LoginUserWithOAuth {
  private oAuthService: IOAuthService;
  private userRepository: IUserRepository;

  constructor(oAuthService: IOAuthService, userRepository: IUserRepository,) {
    this.oAuthService = oAuthService;
    this.userRepository = userRepository;
  }

  async execute(authCode: string): Promise<Either<InvalidOAuthTokenError, OAuthUserDTO>> {
    try {
      const token = await this.oAuthService.getAccessToken(authCode);

      if (!token) {
        return left(new InvalidOAuthTokenError());
      }

      const userInfo = await this.oAuthService.getUserInfo(token);


      let user = await this.userRepository.findUserByGoogleId(userInfo.id);

      if (!user) {
        await this.userRepository.create({
          googleId: userInfo.id,
          email: userInfo.email || "",
          firstname: userInfo.firstname || "",
          lastname: userInfo.lastname || "",
        })
      }

      return right(userInfo);
    } catch (error) {
      

      return left(new InvalidOAuthTokenError());
    }
  }
}
