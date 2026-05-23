import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../lib/jwt';
import { isBlacklisted } from '../lib/redis';
import prisma from '../lib/prisma';

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export async function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const token = authHeader.substring(7);

  // Проверка в черном списке
  if (await isBlacklisted(token)) {
    res.status(401).json({ error: 'Token has been revoked' });
    return;
  }

  const payload = verifyAccessToken(token);

  if (!payload) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }

  // Проверка существования пользователя
  const user = await prisma.user.findUnique({
    where: { id: payload.userId, isActive: true },
  });

  if (!user) {
    res.status(401).json({ error: 'User not found or inactive' });
    return;
  }

  req.user = payload;
  next();
}

// Middleware для проверки роли ADMIN
export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  if (req.user?.role !== 'ADMIN') {
    res.status(403).json({ error: 'Admin access required' });
    return;
  }
  next();
}

// Middleware для проверки роли MODERATOR или выше
export function requireModerator(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'MODERATOR') {
    res.status(403).json({ error: 'Moderator access required' });
    return;
  }
  next();
}

// Опциональная аутентификация (не блокирует запрос)
export async function optionalAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const payload = verifyAccessToken(token);
    if (payload && !(await isBlacklisted(token))) {
      req.user = payload;
    }
  }
  next();
}