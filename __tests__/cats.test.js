const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cats routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET should return a list of cats', async () => {
    const res = await request(app).get('/cats');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      age: expect.any(Number),
      breed: expect.any(String)
    });
  });
  it('GET should return a cat with id matching request params', async () => {
    const res = await request(app).get('/cats/1');
    expect(res.body).toEqual({
      id: '1',
      name: 'Arlop',
      age: 3,
      breed: 'Lynx Point Siamese'
    });
  });
  afterAll(() => {
    pool.end();
  });
});
