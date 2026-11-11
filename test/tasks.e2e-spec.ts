import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module.js';

describe('Tasks (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    // Same global setup as main.ts
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    await app.init();

    // Start from empty tables in the test database
    const dataSource = app.get(DataSource);
    if (dataSource.options.database !== 'mytasks_test') {
      throw new Error('e2e tests must run against mytasks_test');
    }
    await dataSource.query('TRUNCATE TABLE tasks, users RESTART IDENTITY');

    const user = { email: 'e2e@example.com', password: 'Secret123!' };
    await request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(201);
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(200);
    token = login.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /tasks is public and returns an array', async () => {
    const res = await request(app.getHttpServer()).get('/tasks').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /tasks without a token returns 401', async () => {
    await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Should fail' })
      .expect(401);
  });

  it('POST /tasks with a token creates the task', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Write e2e tests' })
      .expect(201);

    expect(res.body).toMatchObject({ title: 'Write e2e tests', done: false });
    expect(res.body.id).toEqual(expect.any(Number));
  });
});
