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
};
