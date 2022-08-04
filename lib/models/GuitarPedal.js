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
    if (!rows.length) return null;
    return new GuitarPedal(rows[0]);
  }

  static async insert({ name, brand, type, price }) {
    const { rows  } = await pool.query(
      `INSERT INTO guitar_pedals (name, brand, type, price)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, brand, type, price]
    );
    return new GuitarPedal(rows[0]);
  }

  static async update(id, pedalUpdate) {
    const pedal = await GuitarPedal.getById(id);
    if (!pedal) return null;
    const { name, brand, type, price } = { ...pedal, ...pedalUpdate };
    const { rows } = await pool.query(
      `UPDATE guitar_pedals SET
      name = $1, brand = $2, type = $3, price = $4
      WHERE id = $5 RETURNING *`,
      [name, brand, type, price, id]
    );
    return new GuitarPedal(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM guitar_pedals
      WHERE id = $1 RETURNING *`, [id]
    );
    return new GuitarPedal(rows[0]);
  }
};
