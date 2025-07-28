import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '@clerk/express';
import { UnauthorizedException } from '@nestjs/common';
import ClerkJWTClaims from 'types/clerk-jwt-claims';

export async function clerkAuthMiddleware(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '').trim();
      const payload = await verifyToken(token, {});
      req.user = payload as ClerkJWTClaims;
    }

    next();
  } catch {
    throw new UnauthorizedException();
  }
}
