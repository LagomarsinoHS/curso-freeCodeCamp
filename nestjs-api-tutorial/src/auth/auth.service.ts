import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

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
          id: true,
        },
      });

      return {
        msg: 'User created',
        user: this.signToken(user.id, user.email),
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

    return await this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
    //): Promise<{ access_token: string }> {
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId, //
      email,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.configService.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
