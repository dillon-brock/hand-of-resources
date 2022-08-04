const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('city routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET should return a list of cities', async () => {
    const res = await request(app).get('/cities');
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      city: expect.any(String),
      state: expect.any(String),
      population: expect.any(Number)
    });
  });
  afterAll(() => {
    pool.end();
  });
});
