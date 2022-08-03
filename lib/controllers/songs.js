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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const song = await Song.getById(req.params.id);
      res.json(song);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newSong = await Song.insert(req.body);
      res.json(newSong);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updatedSong = await Song.update(req.params.id, req.body);
      res.json(updatedSong);
    } catch (e) {
      next(e);
    }
  });
