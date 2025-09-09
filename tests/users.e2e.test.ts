import request from 'supertest';
import { MongoClient, ObjectId } from 'mongodb';
import { createApp } from '../src/app.js';

describe('GET /users/:id (age > 21 only)', () => {
  let client: MongoClient;

  const OVER_21_ID = new ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa');
  const UNDER_21_ID = new ObjectId('bbbbbbbbbbbbbbbbbbbbbbbb');

  beforeAll(async () => {
    // Provided by @shelf/jest-mongodb preset
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    client = await MongoClient.connect(process.env.MONGO_URL!);
    const db = client.db('testdb');

    await db.collection('users').deleteMany({});
    await db.collection('users').insertMany([
      {
        _id: OVER_21_ID,
        name: 'John Doe',
        email: 'johndoe@email.com',
        age: 30
      },
      {
        _id: UNDER_21_ID,
        name: 'Jane Teen',
        email: 'jane@example.com',
        age: 19
      }
    ]);
  });

  afterAll(async () => {
    await client.close();
  });

  it('returns 200 + user when user is over 21', async () => {
    const app = createApp(client.db('testdb'));
    const res = await request(app).get(`/users/${OVER_21_ID.toHexString()}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      _id: OVER_21_ID.toHexString(),
      name: 'John Doe',
      email: 'johndoe@email.com',
      age: 30
    });
  });

  it('returns 404 when user exists but is under 22 (filtered out)', async () => {
    const app = createApp(client.db('testdb'));
    const res = await request(app).get(`/users/${UNDER_21_ID.toHexString()}`);
    expect(res.status).toBe(404);
  });

  it('returns 404 when not found', async () => {
    const app = createApp(client.db('testdb'));
    const res = await request(app).get(`/users/${new ObjectId().toHexString()}`);
    expect(res.status).toBe(404);
  });

  it('returns 400 for invalid ObjectId', async () => {
    const app = createApp(client.db('testdb'));
    const res = await request(app).get('/users/not-an-id');
    expect(res.status).toBe(400);
  });
});
