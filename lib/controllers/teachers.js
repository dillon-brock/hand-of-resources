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
      if (!teacher) {
        next();
      }
      res.json(teacher);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newTeacher = await Teacher.insert(req.body);
      res.json(newTeacher);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updatedTeacher = await Teacher.update(req.params.id, req.body);
      res.json(updatedTeacher);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const deletedTeacher = await Teacher.delete(req.params.id);
      res.json(deletedTeacher);
    } catch (e) {
      next(e);
    }
  });
