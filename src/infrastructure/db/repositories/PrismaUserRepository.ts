import { PrismaClient, User } from '@prisma/client';
import { IUserRepository } from '../../../domain/repositories/user/IUserRepository';
import { OAuthUserDTO, OAuthUserResponseDTO } from '../../../application/dtos/auth/oauth.dto';
import { UserDTO } from '../../../application/dtos/user/user.dto';
import { LoginResponseDTO } from '../../../application/dtos/auth/login.dto';


const prisma = new PrismaClient();

export class PrismaUserRepository implements IUserRepository {
  async count(): Promise<number> {
    return await prisma.user.count();
  }

  async findAllUsers(): Promise<UserDTO[]> {
    // Busca todos os usuários no banco de dados
    return await prisma.user.findMany();
  }

  async findUserByEmail(email: string): Promise<UserDTO | null> {
    // Busca um usuário pelo e-mail
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
    
    return result
  }

  async create(user: UserDTO, roleName: string = 'USER'): Promise<User> {
    const roleToConnect = await prisma.role.findUnique({ where: { name: roleName } });
    if (!roleToConnect) {
      throw new Error(`Role ${roleName} not found`);
    }

    const newUser = await prisma.user.create({
      data: {
        ...user,
        roles: {
          create: [
            {
              role: {
                connect: {
                  id: roleToConnect.id,
                },
              },
            },
          ],
        },
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
    return newUser;
  }

  async exists(email: string): Promise<boolean> {
    // Verifica se o usuário existe pelo e-mail
    const user = await this.findUserByEmail(email);
    return user !== null;
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { password: newPassword }, // Deve ser hash da senha
    });
  }

  async findUserByGoogleId(googleId: string): Promise<OAuthUserResponseDTO | null> {
    const user = await prisma.user.findUnique({
      where: { googleId },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      googleId: user.googleId,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };
  }

}
