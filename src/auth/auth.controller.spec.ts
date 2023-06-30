import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { db } from '../../test/utils/prisma';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60d' },
        }),
      ],
      providers: [
        UsersService,
        AuthService,
        { provide: PrismaService, useValue: db },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be able to register', () => {
    const spy = jest.spyOn(controller, 'register');
    const newUser = {
      username: 'username',
      email: 'mail@mail.com',
      password: 'pass',
    };

    expect(controller.register(newUser)).resolves.toMatchObject({
      ...newUser,
      id: '1',
    });
    expect(spy).toHaveBeenCalledWith(newUser);
  });
});
