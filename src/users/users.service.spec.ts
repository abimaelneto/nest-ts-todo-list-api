import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

import { PrismaService } from '../prisma/prisma.service';
import { db } from '../../test/utils/prisma';

describe('UsersService', () => {
  let service: UsersService;

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
  it('should get user ', async () => {
    const user = {
      username: 'Rich',
      email: 'hello@prisma.io',
    };

    await expect(service.user(user)).resolves.toMatchObject({
      ...user,
      id: '1',
    });
  });
});
