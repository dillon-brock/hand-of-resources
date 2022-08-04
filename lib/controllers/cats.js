const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const cats = await Cat.getAll();
      res.json(cats);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const cat = await Cat.getById(req.params.id);
      res.json(cat);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newCat = await Cat.insert(req.body);
      res.json(newCat);
    } catch (e) {
      next(e);
    }
  });
