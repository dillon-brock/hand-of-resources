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
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      city: expect.any(String),
      state: expect.any(String),
      population: expect.any(Number)
    });
  });
  it('GET should return a city with id matching request params', async () => {
    const res = await request(app).get('/cities/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      city: 'New York City',
      state: 'New York',
      population: 8930002
    });
  });
  afterAll(() => {
    pool.end();
  });
});
