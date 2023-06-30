import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.user({ email });
    if (user?.password !== password) {
      throw new UnauthorizedException("User doesn't exist");
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async register(data: Prisma.UserCreateInput) {
    const { username, email } = data;
    const emailAlreadyUsed = await this.usersService.user({ email });
    const usernameAlreadyUsed = await this.usersService.user({ username });

    if (emailAlreadyUsed || usernameAlreadyUsed)
      throw new HttpException(
        'username and email must be unique',
        HttpStatus.BAD_REQUEST,
      );
    return this.usersService.create(data);
  }
}
