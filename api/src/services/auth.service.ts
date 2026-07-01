import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { AppError } from '@/errors/AppError';

export class AuthService {
  private readonly jwtSecret: string;

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error('Configuração fatal: JWT_SECRET não definido no .env');
    }
    this.jwtSecret = process.env.JWT_SECRET;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        profile: {
          include: {
            permissions: true
          }
        }
      }
    });

    if (!user || !user.password) {
      throw new AppError('Usuário ou senha incorretos.', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Usuário ou senha incorretos.', 401);
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.profile?.role
      },
      this.jwtSecret,
      { expiresIn: '1d' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: {
          id: user.profile?.id,
          name: user.profile?.name,
          role: user.profile?.role,
          permissions: user.profile?.permissions.map(permission => permission.key) ?? []
        }
      }
    };
  }

  async logout() {

    return { success: true, message: 'Logout processado' };
  }
}