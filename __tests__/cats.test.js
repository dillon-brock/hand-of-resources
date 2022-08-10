const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cats routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /cats should return a list of cats', async () => {
    const res = await request(app).get('/cats');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      age: expect.any(Number),
      breed: expect.any(String)
    });
  });
  it('GET /cats/:id should return a cat with id matching request params', async () => {
    const res = await request(app).get('/cats/1');
    expect(res.body).toEqual({
      id: '1',
      name: 'Arlop',
      age: 3,
      breed: 'Lynx Point Siamese'
    });
  });
  it('POST /cats should add a new cat', async () => {
    const newCat = {
      name: 'Leo',
      age: 7,
      breed: 'Orange Tabby',
    };
    const res = await request(app).post('/cats').send(newCat);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newCat
    });
  });
  it('PUT cats/:id should update a cat', async () => {
    const catUpdate = {
      name: 'Iris'
    };
    const res = await request(app).put('/cats/4').send(catUpdate);
    expect(res.status).toBe(200);
    
    const updateResp = await request(app).get('/cats/4');
    expect(updateResp.body).toEqual({
      id: '4',
      name: 'Iris',
      age: 20,
      breed: 'Calico'
    });
  });
  it('DELETE cats/:id should delete a cat', async () => {
    const res = await request(app).delete('/cats/3');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '3',
      name: 'Marbles',
      age: 17,
      breed: 'Mixed'
    });

    const catResp = await request(app).get('/cats/3');
    expect(catResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
