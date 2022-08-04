const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('guitar pedal routes', () => {
  beforeEach(() => {
    return setup(pool); 
  });
  it('GET should return a list of guitar pedals', async () => {
    const res = await request(app).get('/guitar-pedals');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      brand: expect.any(String),
      type: expect.any(String),
      price: expect.any(Number)
    });
  });
  it('GET should return a guitar pedal with id matching the request params', async () => {
    const res = await request(app).get('/guitar-pedals/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      name: 'Astral Destiny',
      brand: 'Earthquaker Devices',
      type: 'Reverb',
      price: 199
    });
  });
  afterAll(() => {
    pool.end();
  });
});
