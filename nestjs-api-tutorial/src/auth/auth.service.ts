import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signup({ email, password }: AuthDTO) {
    // Generate password Hash
    const hash = await argon.hash(password);

    try {
      //Save new user on DB
      const user = await this.prismaService.user.create({
        data: {
          email,
          hash,
        },
        select: {
          createAt: true,
          updateAt: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          //Este codigo es de duplicidad de registro, prisma tiene codigos
          throw new ForbiddenException('Credentials Taken ');
        }
      }
      throw error;
    }
  }
  login() {
    return { msg: `I am Signing In` };
  }
}
