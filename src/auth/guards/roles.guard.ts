import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [ctx.getHandler(), ctx.getClass()]);

    if (!requiredRoles) return true;

    const { user } = ctx.switchToHttp().getRequest<Express.Request>();
    if (!user) throw new UnauthorizedException('Invalid or missing token');
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.public_metadata.role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
