const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  name;
  age;
  breed;

  constructor({ id, name, age, breed }) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.breed = breed;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cats');
    return rows.map((row) => new Cat(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM cats
      WHERE id = $1`, [id]
    );
    return new Cat(rows[0]);
  }

  static async insert({ name, age, breed }) {
    const { rows } = await pool.query(
      `INSERT INTO cats (name, age, breed) VALUES
      ($1, $2, $3) RETURNING *`, [name, age, breed]
    );
    return new Cat(rows[0]);
  }
};
