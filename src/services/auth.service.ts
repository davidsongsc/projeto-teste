import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs'; 
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
      where: { email },
      include: { profile: true }
    });

    // 1. Validar se o usuário existe
    if (!user || !user.password) {
      throw new AppError('Usuário ou senha incorretos.', 401);
    }

    // 2. Comparar a senha do body com o HASH salvo no banco
    const passwordMatch = await compare(password, user.password);

    console.log('passwordMatch', passwordMatch);
    console.log('password', password);
    console.log('user.password', user.password);

    if (!passwordMatch) {
      throw new AppError('Usuário ou senha incorretos.', 401);
    }

    // 3. Gerar o token com os dados necessários
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
        profile: user.profile
      }
    };
  }

  async logout() {

    return { success: true, message: 'Logout processado' };
  }
}