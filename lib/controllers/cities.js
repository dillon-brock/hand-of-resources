const { Router } = require('express');
const City = require('../models/City');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const cities = await City.getAll();
      res.json(cities);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const city = await City.getById(req.params.id);
      res.json(city);
    } catch (e) {
      next(e);
    }
  });
