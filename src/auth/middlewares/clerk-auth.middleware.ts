import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '@clerk/express';
import { UnauthorizedException } from '@nestjs/common';
import ClerkJWTClaims from 'types/clerk-jwt-claims';

export async function clerkAuthMiddleware(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '').trim();
      const payload = await verifyToken(token, {
        jwtKey: process.env.CLERK_JWT_KEY,
      });
      req.user = payload as ClerkJWTClaims;
    }

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new UnauthorizedException();
  }
}
