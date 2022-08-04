const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('teacher routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /teachers should return a list of teachers', async () => {
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
  it('GET /teachers/:id should return a teacher with id matching request params', async () => {
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
  it('POST /teachers should add a new teacher', async () => {
    const newTeacher = {
      first_name: 'Jesse',
      last_name: 'Mejìa',
      subject: 'Creative Coding',
      school: 'Portland Community College'
    };
    const res = await request(app).post('/teachers').send(newTeacher);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newTeacher
    });
  });
  it('PUT /teachers/:id should update a teacher', async () => {
    const teacherUpdate = {
      subject: 'Alexander Technique',
    };
    const res = await request(app).put('/teachers/1').send(teacherUpdate);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      first_name: 'Helen',
      last_name: 'Spencer-Wallace',
      subject: 'Alexander Technique',
      school: 'Portland Community College'
    });
  });
  it('DELETE /teachers/:id should delete a teacher', async () => {
    const res = await request(app).delete('/teachers/4');
    expect(res.status).toBe(200);

    const teacherRes = await request(app).get('/teachers/4');
    expect(teacherRes.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
