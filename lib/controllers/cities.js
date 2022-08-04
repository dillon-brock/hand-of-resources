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
  });
