const { Router } = require('express');
const Teacher = require('../models/Teacher');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const teachers = await Teacher.getAll();
      res.json(teachers);
    } catch (e) {
      next(e);
    }
  });
