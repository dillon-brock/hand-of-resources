const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('song routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET should return a list of songs', async () => {
    const res = await request(app).get('/songs');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(4);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      artist: expect.any(String),
      album: expect.any(String),
      length: expect.any(Number)
    });
  });
  afterAll(() => {
    pool.end();
  });
});
