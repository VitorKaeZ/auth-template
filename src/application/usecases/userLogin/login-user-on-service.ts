// usecases/login/login-user-on-database.ts

import { LoginRequestDTO, LoginResponseDTO } from "../../dtos/auth/login.dto";
import { Either, left, right } from "../../../shared/either";
import { InvalidEmailError } from "../../../domain/entities/user/errors/invalid.email";
import { InvalidPasswordError } from "../../../domain/entities/user/errors/invalid.password";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { IUserRepository } from "../../../domain/repositories/user/IUserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginUser } from "./login-user";

export class LoginUserOnService implements LoginUser {
  private userRepository: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepository = userRepo;
  }

  async loginUserOnService(userData: LoginRequestDTO): Promise<Either<InvalidCredentialsError, LoginResponseDTO>> {
    const user = await this.userRepository.findUserByEmail(userData.email);
    
    if (!user || !user.password) {
      return left(new InvalidCredentialsError());
    }

    const passwordMatch = await bcrypt.compare(userData.password, user.password);

    if (!passwordMatch) {
      return left(new InvalidCredentialsError());
    }

    const jwtToken = "" + process.env.JWT_TOKEN

    const roleNames = user.roles.map(userRole => userRole.role.name);

    const token = jwt.sign({ userId: user.id, email: user.email, roles: roleNames }, jwtToken, {
      expiresIn: "1h",
    });

    const response: LoginResponseDTO = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.firstname,
        token
    };

    return right(response);
  }
}
