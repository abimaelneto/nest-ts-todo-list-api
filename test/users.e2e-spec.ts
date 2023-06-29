import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { db } from './utils/prisma';
import { AuthModule } from '../src/auth/auth.module';
import { UsersModule } from '../src/users/users.module';

describe('To Do Lists', () => {
  let app: INestApplication;
  const mockedUser = { email: 'fulano@mail.com', password: '1234' };
  const newUser = {
    username: 'fulano',
    email: 'fulano@mail.com',
    password: '1234',
  };

  let accessToken: string;

  const mockRegister = async () => {
    await request(app.getHttpServer()).post('/auth/register').send(newUser);
  };

  const mockLogin = async (user = mockedUser) => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user);

    accessToken = res?.body?.access_token;
  };
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule, AuthModule],
    })

      .overrideProvider(PrismaService)
      .useValue(db)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    db.reset();
  });

  it(`Retrieve user data`, async () => {
    await mockRegister();
    await mockLogin();
    await request(app.getHttpServer())
      .get('/users/me')
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200)
      .expect({ ...newUser, id: '1' });
  });
});
