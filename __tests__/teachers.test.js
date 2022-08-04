const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('teacher routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET should return a list of teachers', async () => {
    const res = await request(app).get('/teachers');
    expect(res.status).toBe(200);
    expect(res.body.find((teacher) => teacher.first_name === 'Helen')).toEqual({
      id: '1',
      first_name: 'Helen',
      last_name: 'Spencer-Wallace',
      subject: 'Analog Modular Synthesis',
      school: 'Portland Community College'
    });
  });
  it('GET should return a teacher with id matching request params', async () => {
    const res = await request(app).get('/teachers/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '2',
      first_name: 'Tom',
      last_name: 'Walsh',
      subject: 'History',
      school: 'Falmouth High School'
    });
  });
  afterAll(() => {
    pool.end();
  });
});
