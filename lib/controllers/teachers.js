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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const teacher = await Teacher.getById(req.params.id);
      res.json(teacher);
    } catch (e) {
      next(e);
    }
  });
