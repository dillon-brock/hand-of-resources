const pool = require('../utils/pool');

module.exports = class City {
  id;
  city;
  state;
  population;

  constructor({ id, city, state, population }) {
    this.id = id;
    this.city = city;
    this.state = state;
    this.population = population;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM us_cities');
    return rows.map((row) => new City(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM us_cities
      WHERE id = $1`, [id]
    );
    if (!rows.length) return null;
    return new City(rows[0]);
  }

  static async insert({ city, state, population }) {
    const { rows } = await pool.query(
      `INSERT INTO us_cities (city, state, population)
      VALUES ($1, $2, $3) RETURNING *`,
      [city, state, population]
    );
    return new City(rows[0]);
  }

  static async update(id, cityUpdate) {
    const originalCity = await City.getById(id);
    if (!originalCity) return null;
    const { city, state, population } = { ...originalCity, ...cityUpdate };
    const { rows } = await pool.query(
      `UPDATE us_cities SET
      city = $1, state = $2, population = $3
      WHERE id = $4 RETURNING *;`,
      [city, state, population, id]
    );
    return new City(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM us_cities
      WHERE id = $1 RETURNING *`,
      [id]
    );
    return new City(rows[0]);
  }
};
