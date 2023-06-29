import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { db } from '../../test/utils/prisma';
import { request } from 'express';

describe('UsersController', () => {
  let controller: UsersController;
  const usersService = {
    user: jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: '123',
        username: 'user',
        email: 'user@mail.com',
        password: '',
      }),
    ),
    create: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should read user details', () => {
    request['user'] = {
      sub: '123',
      username: 'user',
    };
    expect(controller.getUserInfo(request)).toStrictEqual(usersService.user());
  });
});
