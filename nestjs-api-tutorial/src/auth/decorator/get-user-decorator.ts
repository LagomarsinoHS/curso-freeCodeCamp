import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// createParamDecorator -> This allow you to use @NameOfDecorator
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    if (data) return request.user[data];
    return request.user;
  },
);
