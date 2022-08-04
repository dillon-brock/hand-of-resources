const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('guitar pedal routes', () => {
  beforeEach(() => {
    return setup(pool); 
  });
  it('GET /guitar-pedals should return a list of guitar pedals', async () => {
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
  it('GET /guitar-pedals/:id should return a guitar pedal with id matching the request params', async () => {
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
  it('POST /guitar-pedals should add a new guitar pedal', async () => {
    const newPedal = {
      name: 'Rainbow Machine',
      brand: 'Earthquaker Devices',
      type: 'Pitch-shifting modulator',
      price: 229
    };
    const res = await request(app).post('/guitar-pedals').send(newPedal);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newPedal
    });
  });
  it('PUT /guitar-pedals/:id should update a guitar pedal', async () => {
    const pedalUpdate = {
      name: 'Sunlight Dynamic Freeze Reverb'
    };
    const res = await request(app).put('/guitar-pedals/3').send(pedalUpdate);
    expect(res.status).toBe(200);
    
    const pedalRes = await request(app).get('/guitar-pedals/3');
    expect(pedalRes.body).toEqual({
      id: '3',
      name: 'Sunlight Dynamic Freeze Reverb',
      brand: 'Old Blood Noise Endeavors',
      type: 'Reverb',
      price: 219
    });
  });
  it('DELETE /guitar-pedals/:id should delete a guitar pedal', async () => {
    const res = await request(app).delete('/guitar-pedals/4');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '4',
      name: 'Alpha Haunt',
      brand: 'Old Blood Noise Endeavors',
      type: 'Fuzz',
      price: 229
    });
    
    const pedalRes = await request(app).get('/guitar-pedals/4');
    expect(pedalRes.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
