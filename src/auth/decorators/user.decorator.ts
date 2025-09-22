import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: string | undefined, ctx: ExecutionContext): unknown => {
  const request: Express.Request = ctx.switchToHttp().getRequest();
  return data ? request.user?.public_metadata?.[data] : request.user?.public_metadata;
});
