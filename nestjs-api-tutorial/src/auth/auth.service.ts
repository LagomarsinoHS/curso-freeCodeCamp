import { Injectable, Logger } from '@nestjs/common';
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

      return {
        msg: 'User created',
        user,
      };
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

  async login({ email, password }: AuthDTO) {
    // Find user by Email
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    // If user not exist throw exception
    if (!user) throw new ForbiddenException('User not found');

    // Compare Password
    const pwMatches = await argon.verify(user.hash, password);

    // If password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Password Incorrect');
    // Send back the user

    delete user.hash;
    return {
      msg: `Logged in`,
      user,
    };
  }
}
