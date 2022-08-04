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
    if (!rows.length) return null;
    return new Cat(rows[0]);
  }

  static async insert({ name, age, breed }) {
    const { rows } = await pool.query(
      `INSERT INTO cats (name, age, breed) VALUES
      ($1, $2, $3) RETURNING *`, [name, age, breed]
    );
    return new Cat(rows[0]);
  }

  static async update(id, catUpdate) {
    const cat = await Cat.getById(id);
    if (!cat) return null;
    const { name, age, breed } = { ...cat, ...catUpdate };
    const { rows } = await pool.query (
      `UPDATE cats SET
      name = $1, age = $2, breed = $3
      WHERE id = $4 RETURNING *`, [name, age, breed, id]
    );
    return new Cat(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM cats WHERE id = $1 RETURNING *',
      [id]
    );
    return new Cat(rows[0]);
  }
};
