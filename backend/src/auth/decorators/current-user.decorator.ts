import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../users/users.repository';

export interface RequestWithUser extends Request {
  user?: Omit<User, 'passwordHash'>;
}

export const CurrentUser = createParamDecorator(
  (
    data: keyof Omit<User, 'passwordHash'> | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
