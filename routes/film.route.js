const express = require('express');
const filmModel = require('../models/film.model');
const schema = require('../schemas/film.json');
const router = express.Router();

router.get('/', async function (req, res) {
  const list = await filmModel.all();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const film = await filmModel.single(id);
  if (film === null) {
    return res.status(204).end();
  }

  res.json(film);
})

router.post('/', require('../middlewares/validate.mdw')(schema), async function (req, res) {
  const film = req.body;
  const ids = await filmModel.add(film);
  film.film_id = ids[0];
  res.status(201).json(film);
})

router.put('/:id', require('../middlewares/validate.mdw')(schema), async function (req, res) {
  const id = req.params.id
  const changes = req.body;
  const count = await filmModel.update(id, changes);
  if (count) {
    res.status(200).json({updated: 'success'})
  } else {
    res.status(404).json({message: "Record not found"})
  }
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id
  const count = await filmModel.delete(id)
  if (count) {
    res.status(200).json({deleted: 'success'})
  } else {
    res.status(404).json({message: "Record not found"})
  }
})


module.exports = router;