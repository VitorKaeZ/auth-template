// usecases/login/login-user-on-database.ts

import { UserDataLoginRequest, UserDataLoginResponse } from "../../entities/user/user-data";
import { Either, left, right } from "../../shared/either";
import { InvalidEmailError } from "../../entities/user/errors/invalid.email";
import { InvalidPasswordError } from "../../entities/user/errors/invalid.password";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { UserRepository } from "../ports/user-repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginUser } from "./login-user";

export class LoginUserOnService implements LoginUser {
  private userRepository: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepository = userRepo;
  }

  async loginUserOnService(userData: UserDataLoginRequest): Promise<Either<InvalidCredentialsError, UserDataLoginResponse>> {
    // Verifica se o email é válido
    const user = await this.userRepository.findUserByEmail(userData.email);
    
    if (!user) {
      return left(new InvalidCredentialsError());
    }

    // Verifica se a senha está correta
    const passwordMatch = await bcrypt.compare(userData.password, user.password);

    if (!passwordMatch) {
      return left(new InvalidCredentialsError());
    }

    // Gera o token JWT (substitua 'your-secret-key' pelo seu segredo JWT)
    const jwtToken = "" + process.env.JWT_TOKEN

    const token = jwt.sign({ userId: user.id, email: user.email }, jwtToken, {
      expiresIn: "1h",
    });

    const response: UserDataLoginResponse = {
        id: user.id,
        email:user.email,
        firstname: user.firstname,
        lastname: user.firstname,
        token
    };

    return right(response);
  }
}
