import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  const db = {
    user: {
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      create: jest
        .fn()
        .mockImplementation(({ data }: { data: Prisma.UserCreateInput }) => {
          return { ...data, id: '1' } as User;
        }),
      delete: jest.fn().mockResolvedValue({}),
    },
  };

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
  it.only('should create new user ', async () => {
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
