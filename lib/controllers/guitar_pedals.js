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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const guitarPedal = await GuitarPedal.getById(req.params.id);
      res.json(guitarPedal);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newPedal = await GuitarPedal.insert(req.body);
      res.json(newPedal);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updatedPedal = await GuitarPedal.update(req.params.id, req.body);
      res.json(updatedPedal);
    } catch (e) {
      next(e);
    }
  });
