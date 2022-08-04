const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('song routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /songs should return a list of songs', async () => {
    const res = await request(app).get('/songs');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      artist: expect.any(String),
      album: expect.any(String),
      length: expect.any(Number)
    });
  });
  it('GET /songs/:id should return a song with id matching request params', async () => {
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
  it('POST /songs should add a new song', async () => {
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
  it('PUT /songs/:id should update a song', async () => {
    const newSongData = {
      title: 'Title and Registration',
      length: 219
    };
    const res = await request(app).put('/songs/1').send(newSongData);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      title: 'Title and Registration',
      artist: 'Death Cab For Cutie',
      album: 'Transatlanticism',
      length: 219
    });
  });
  it('DELETE /songs/:id should delete a song', async () => {
    const res = await request(app).delete('/songs/4');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '4',
      title: 'Some things Cosmic',
      artist: 'Angel Olsen',
      album: 'Strange Cacti',
      length: 175
    });

    const songResp = await request(app).get('/songs/4');
    expect(songResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
