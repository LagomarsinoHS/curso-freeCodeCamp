import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDTO } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  //Original
  // Agrego AuthGuard al useGuards y le doy el string del cual comparará al llamar al password en jwt.strategy
  @UseGuards(AuthGuard('jwt'))
  @Get('meOriginal')
  getMe() {
    return { msg: 'user Info' };
  }

  //Better one with custom Guard
  @UseGuards(JwtGuard)
  @Get('me')
  //getMe2(@GetUser('id') userData: string) { // Could specify what property i want specificly
  getMe2(@GetUser() userData: User) {
    return userData;
  }

  @Patch()

  // eslint-disable-next-line prettier/prettier
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDTO) {      
    return this.userService.editUser(userId, dto);
  }
}
