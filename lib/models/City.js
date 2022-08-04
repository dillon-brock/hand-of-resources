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
};
