import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../domain/repositories/user/IUserRepository';
import { UserData } from '../../domain/entities/user/user-data';

const prisma = new PrismaClient();

export class PrismaUserRepository implements IUserRepository {
  async findAllUsers(): Promise<UserData[]> {
    // Busca todos os usuários no banco de dados
    return await prisma.user.findMany();
  }

  async findUserByEmail(email: string): Promise<UserData | null> {
    // Busca um usuário pelo e-mail
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        password: true,
      },
    });
    
    return result
  }

  async add(user: UserData): Promise<void> {
    // Verifica se o usuário já existe pelo e-mail
    const exists = await this.exists(user.email);
    if (!exists) {
      // Adiciona o usuário se ele não existir
      await prisma.user.create({
        data: user,
      });
    }
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
}
