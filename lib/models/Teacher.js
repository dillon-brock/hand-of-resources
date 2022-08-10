const pool = require('../utils/pool');

module.exports = class Teacher {
  id;
  first_name;
  last_name;
  school;
  subject;

  constructor({ id, first_name, last_name, school, subject }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.school = school;
    this.subject = subject;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM teachers');
    return rows.map((row) => new Teacher(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM teachers
      WHERE id = $1`, [id]
    );
    if (rows.length === 0) return null;
    return new Teacher(rows[0]);
  }

  static async insert({ first_name, last_name, school, subject }) {
    const { rows } = await pool.query(
      `INSERT INTO teachers (first_name, last_name, school, subject)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [first_name, last_name, school, subject]
    );
    return new Teacher(rows[0]);
  }

  static async update(id, teacherUpdate) {
    const teacher = await Teacher.getById(id);
    if (!teacher) return null;
    const { first_name, last_name, school, subject } = { ...teacher, ...teacherUpdate };
    const { rows } = await pool.query(
      `UPDATE teachers SET
      first_name = $1, last_name = $2, school = $3, subject = $4
      WHERE id = $5 RETURNING *`,
      [first_name, last_name, school, subject, id]
    );
    return new Teacher(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM teachers
      WHERE id = $1 RETURNING *`,
      [id]
    );

    return new Teacher(rows[0]);
  }
};
