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
};
