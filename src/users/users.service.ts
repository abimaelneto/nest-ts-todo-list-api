import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(where: Prisma.UserWhereUniqueInput) {
    const res = await this.prisma.user.findUnique({
      where,
    });
    return res;
  }
  async create(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data });
  }
}
