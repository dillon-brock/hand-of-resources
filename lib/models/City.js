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
};
