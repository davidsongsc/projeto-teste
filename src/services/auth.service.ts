import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { AppError } from '@/errors/AppError';

export class AuthService {
  private readonly jwtSecret: string;

  constructor() {
    // Validação imediata: se não houver segredo, o sistema não deve nem subir
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

    // Segurança: Use a mesma mensagem para não revelar se o e-mail existe
    if (!user || user.password !== password) {
      throw new AppError('Usuário ou senha incorretos.', 401);
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        profile: user.profile?.role
      },
      this.jwtSecret, // Use a variável validada no constructor
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
    return prisma.user.updateMany({ where: { status: true }, data: { status: false } });
  }
}