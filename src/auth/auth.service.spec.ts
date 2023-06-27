import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { db } from '../../test/utils/prisma';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60d' },
        }),
      ],
      providers: [
        AuthService,
        UsersService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("shouldn't allow to create user with username already in use", () => {
    service.register({
      username: 'fulano',
      email: 'fulano@mail.com',
      password: 'myPass',
    });
  });
});
