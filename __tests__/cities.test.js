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
  it('POST should add a city', async () => {
    const newCity = {
      city: 'Los Angeles',
      state: 'California',
      population: 3919973
    };
    const res = await request(app).post('/cities').send(newCity);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newCity
    });
  });
  it('PUT should update a city', async () => {
    const cityUpdate = {
      city: 'N.Y.C.'
    };
    const res = await request(app).put('/cities/1').send(cityUpdate);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      city: 'N.Y.C.',
      state: 'New York',
      population: 8930002
    });
  });
  it('DELETE should delete a city', async () => {
    const res = await request(app).delete('/cities/3');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '3',
      city: 'Austin',
      state: 'Texas',
      population: 965872
    });

    const cityRes = await request(app).get('/cities/3');
    expect(cityRes.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
