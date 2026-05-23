import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../lib/prisma';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../lib/jwt';
import { addToBlacklist } from '../lib/redis';
import { RegisterInput, LoginInput } from '../schemas/auth.schema';

export class AuthService {
  async register(data: RegisterInput) {
    const { email, username, password } = data;

    // Проверка на существующего пользователя
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    // Хеширование пароля
    const passwordHash = await bcrypt.hash(password, 10);

    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
        balance: 0,
        isActive: true,
      },
    });

    // Создание корзины для пользователя
    await prisma.cart.create({
      data: {
        userId: user.id,
      },
    });

    // Генерация токенов
    const tokens = this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        balance: user.balance,
      },
      ...tokens,
    };
  }

  async login(data: LoginInput) {
    const { email, password } = data;

    // Поиск пользователя
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Error('Account is disabled');
    }

    // Проверка пароля
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Генерация токенов
    const tokens = this.generateTokens(user.id, user.email, user.role);

    // Сохранение refresh token в БД
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 дней
      },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        balance: user.balance,
        avatar: user.avatar,
      },
      ...tokens,
    };
  }

  async refresh(refreshToken: string) {
    // Верификация refresh token
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      throw new Error('Invalid refresh token');
    }

    // Проверка в БД
    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new Error('Invalid or expired refresh token');
    }

    if (!session.user.isActive) {
      throw new Error('User account is disabled');
    }

    // Удаление старой сессии
    await prisma.session.delete({ where: { id: session.id } });

    // Генерация новых токенов
    const tokens = this.generateTokens(
      session.user.id,
      session.user.email,
      session.user.role
    );

    // Сохранение нового refresh token
    await prisma.session.create({
      data: {
        userId: session.user.id,
        refreshToken: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return tokens;
  }

  async logout(refreshToken: string, accessToken: string) {
    // Удаление сессии
    await prisma.session.deleteMany({
      where: { refreshToken },
    });

    // Добавление access token в черный список
    // Декодируем токен чтобы получить время истечения
    const decoded = require('../lib/jwt').decodeToken(accessToken);
    if (decoded && decoded.exp) {
      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
      if (expiresIn > 0) {
        await addToBlacklist(accessToken, expiresIn);
      }
    }
  }

  private generateTokens(userId: string, email: string, role: string) {
    const payload = { userId, email, role };
    return {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
    };
  }
}

export const authService = new AuthService();