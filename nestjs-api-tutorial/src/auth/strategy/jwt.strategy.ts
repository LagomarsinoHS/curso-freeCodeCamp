import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStratety extends PassportStrategy(
  Strategy,
  'jwt', // This name NEED to be the same as the controller where you use the guard (userController-get(Me))
) {
  constructor(
    configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /*
  This is use when the server get a petition. It will enter to the validate method.
  Payload is the transformed token into a json (jwt.io when you paste the code there).
  If you RETURN something into the method, it means that will pass to the controller logic
  If NOT it will throw an error of Unauthorized
  */
  async validate(payload: { sub: number; email: string }) {
    // console.log('>', payload);
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.sub },
    });
    delete user.hash;
    return user;
  }
}
