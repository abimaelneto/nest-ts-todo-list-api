import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Prisma, User } from '@prisma/client';

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

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
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
