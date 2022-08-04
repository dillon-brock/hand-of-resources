const { Router } = require('express');
const GuitarPedal = require('../models/GuitarPedal');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const guitarPedals = await GuitarPedal.getAll();
      res.json(guitarPedals);
    } catch (e) {
      next(e);
    }
  });
