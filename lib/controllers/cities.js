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
  })
  .post('/', async (req, res, next) => {
    try {
      const newCity = await City.insert(req.body);
      res.json(newCity);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updatedCity = await City.update(req.params.id, req.body);
      res.json(updatedCity);
    } catch (e) {
      next(e);
    }
  });
