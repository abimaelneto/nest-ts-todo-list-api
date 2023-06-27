import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { db } from './utils/prisma/to-do-lists';
import { ToDoListsModule } from '../src/to-do-lists/to-do-lists.module';
import { AuthModule } from '../src/auth/auth.module';

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
      imports: [ToDoListsModule, AuthModule],
    })

      .overrideProvider(PrismaService)
      .useValue(db)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    await mockRegister();
    await mockLogin();
  });

  beforeEach(() => {
    db.reset();
  });

  it(`Retrieve empty set of lists`, async () => {
    return request(app.getHttpServer())
      .get('/lists')
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200)
      .expect([]);
  });
  it(`Try to retrieve unexistent list`, async () => {
    return request(app.getHttpServer())
      .get('/lists/123')
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(400)
      .expect(({ body: { message } }) => message == "List doesn't exist");
  });
  it(`Create and retrieve one list`, async () => {
    const newList = { title: 'new list' };
    await request(app.getHttpServer())
      .post('/lists/new')
      .set({
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      })
      .send(newList);
    await request(app.getHttpServer())
      .get('/lists/1')
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200)
      .expect(({ body }) =>
        expect(body).toMatchObject({ ...newList, id: '1', authorId: '1' }),
      );
  });

  it(`Create lists and retrieve all`, async () => {
    const newList = { title: 'new list' };
    await request(app.getHttpServer())
      .post('/lists/new')
      .set({
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      })
      .send(newList);

    await request(app.getHttpServer())
      .post('/lists/new')
      .set({
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      })
      .send(newList);
    await request(app.getHttpServer())
      .get('/lists')
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200)
      .expect([
        { ...newList, id: '1', authorId: '1' },
        { ...newList, id: '2', authorId: '1' },
      ]);
  });

  it(`Try to create list with missing fields`, async () => {
    const newList = { otherProperty: 'new list' };
    return request(app.getHttpServer())
      .post('/lists/new')
      .set({
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      })
      .send(newList)
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(({ body: { message } }) => message == 'Missing fields');
  });

  it(`Try to update unexistent list`, async () => {
    const payload = {
      title: 'new title',
    };
    await request(app.getHttpServer())
      .patch('/lists/1')
      .set({
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      })
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(({ body: { message } }) => message == "List doesn't exist");
  });

  it(`Create and update list`, async () => {
    const payload = {
      title: 'new title',
    };

    const newList = { title: 'new list' };
    await request(app.getHttpServer())
      .post('/lists/new')
      .set({
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      })
      .send(newList);
    await request(app.getHttpServer())
      .patch('/lists/1')
      .set({
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      })
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(({ body }) =>
        expect(body).toMatchObject({ id: '1', ...payload }),
      );
  });

  it(`Try to delete unexistent list`, async () => {
    return request(app.getHttpServer())
      .delete('/lists/1')
      .set({
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(({ body: { message } }) => message == "List doesn't exist");
  });

  it(`Create and delete list`, async () => {
    const newList = { title: 'new list' };
    await request(app.getHttpServer())
      .post('/lists/new')
      .set({
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      })
      .send(newList);
    await request(app.getHttpServer())
      .delete('/lists/1')
      .set({
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      })
      .expect('Content-Type', /json/)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
