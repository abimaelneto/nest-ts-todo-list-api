import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

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
    return this.usersService.create(data);
  }
}
