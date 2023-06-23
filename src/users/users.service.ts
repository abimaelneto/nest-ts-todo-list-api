import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(UserWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where: UserWhereUniqueInput });
  }
  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }
}
