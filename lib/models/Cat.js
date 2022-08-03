const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  name;
  age;
  breed;

  constructor({ id, name, age, breed}) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.breed = breed;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM CATS');
    return rows.map((row) => new Cat(row));
  }
};
