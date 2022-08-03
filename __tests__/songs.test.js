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
  it('GET should return a song with id matching request params', async () => {
    const res = await request(app).get('/songs/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      title: 'Transatlanticism',
      artist: 'Death Cab For Cutie',
      album: 'Transatlanticism',
      length: 475
    });
  });
  it('POST should add a new song', async () => {
    const newSong = {
      title: 'Glory Glory',
      artist: 'And The Kids',
      album: 'Friends Share Lovers',
      length: 289
    };
    const res = await request(app).post('/songs').send(newSong);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newSong
    });
  });
  it('PUT should update a song', async () => {
    const newSongData = {
      title: 'Pangea',
      album: 'Turn To Each Other',
      length: 215
    };
    const res = await request(app).put('/songs/5').send(newSongData);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '5',
      title: 'Pangea',
      artist: 'And The Kids',
      album: 'Turn To Each Other',
      length: 215
    });
  });
  afterAll(() => {
    pool.end();
  });
});
