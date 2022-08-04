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
      if (!cat) {
        next();
      }
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
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updatedCat = await Cat.update(req.params.id, req.body);
      res.json(updatedCat);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const deletedCat = await Cat.delete(req.params.id, req.body);
      res.json(deletedCat);
    } catch (e) {
      next(e);
    }
  })
