import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { db } from '../../test/utils/prisma';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();
    prisma = module.get<PrismaService>(PrismaService);

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create new user ', async () => {
    const user = {
      username: 'Rich',
      email: 'hello@prisma.io',
      password: 'test',
    };

    await expect(service.create(user)).resolves.toMatchObject({
      ...user,
      id: '1',
    });
  });
});
