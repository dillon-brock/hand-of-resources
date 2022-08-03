const pool = require('../utils/pool');

module.exports = class Song {
  id;
  title;
  artist;
  album;
  length;
  
  constructor({ id, title, artist, album, length }) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.length = length;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM songs;');
    return rows.map((row) => new Song(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM songs
      WHERE id = $1`, [id]
    );
    return new Song(rows[0]);
  }

  static async insert({ title, artist, album, length }) {
    const { rows } = await pool.query(
      `INSERT INTO songs (title, artist, album, length) VALUES
      ($1, $2, $3, $4) RETURNING *`,
      [title, artist, album, length]
    );
    return new Song(rows[0]);
  }

  static async update(id, updateData) {
    const song = await Song.getById(id);
    if (!song) return null;
    const updatedSong = { ...song, ...updateData };
    // console.log('UPDATED SONG', updatedSong);
    const { rows }  = await pool.query(
      `UPDATE songs SET
      title = $2, artist = $3, album = $4, length = $5
      WHERE id = $1 RETURNING *`,
      [id, updatedSong.title, updatedSong.artist, updatedSong.album, updatedSong.length]
    );
    return new Song(rows[0]);

  }
};

