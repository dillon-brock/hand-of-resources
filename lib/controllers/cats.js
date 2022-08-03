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
  });
