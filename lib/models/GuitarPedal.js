const pool = require('../utils/pool');

module.exports = class GuitarPedal {
  id;
  name;
  brand;
  type;
  price;

  constructor({ id, name, brand, type, price }) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.type = type;
    this.price = price;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM guitar_pedals');
    return rows.map((row) => new GuitarPedal(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM guitar_pedals
      WHERE id = $1`, [id]
    );
    return new GuitarPedal(rows[0]);
  }
};
