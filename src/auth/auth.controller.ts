import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma, User } from '@prisma/client';
import { Public } from 'src/public-metadata';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('/login')
  async login(
    @Body() data: { username: string; password: string },
  ): Promise<{ access_token: string }> {
    const { username, password } = data;
    if (!username || !password)
      throw new HttpException('Missing fields', HttpStatus.BAD_REQUEST);

    return this.authService.signIn(username, password);
  }
  @Public()
  @Post('/register')
  async register(
    @Body() data: { username: string; password: string; email: string },
  ) {
    const { username, password, email } = data;
    if (!username || !password || !email)
      throw new HttpException('Missing fields', HttpStatus.BAD_REQUEST);
    return this.authService.register(data);
  }
}
