import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/me')
  async getUserInfo(@Req() req: Request): Promise<UserModel | null> {
    const userId = req?.user?.sub;
    if (!userId)
      throw new HttpException(
        'No credentials provided',
        HttpStatus.UNAUTHORIZED,
      );

    const res = await this.usersService.user({ id: userId });
    return res;
  }
}
