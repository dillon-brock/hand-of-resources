const { Router } = require('express');
const Song = require('../models/Song');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const songs = await Song.getAll();
      res.json(songs);
    } catch(e) {
      next(e);
    }
  });
