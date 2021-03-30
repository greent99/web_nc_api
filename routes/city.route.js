const express = require('express');
const cityModel = require('../models/city.model');
const schema = require('../schemas/city.json');
const router = express.Router();

router.get('/', async function (req, res) {
  const list = await cityModel.all();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const city = await cityModel.single(id);
  if (city === null) {
    return res.status(204).end();
  }

  res.json(city);
})

router.post('/', require('../middlewares/validate.mdw')(schema), async function (req, res) {
  const city = req.body;
  const ids = await cityModel.add(city);
  city.city_id = ids[0];
  res.status(201).json(city);
})

router.put('/:id', require('../middlewares/validate.mdw')(schema), async function (req, res) {
  const id = req.params.id
  const changes = req.body;
  const count = await cityModel.update(id, changes);
  if (count) {
    res.status(200).json({updated: 'success'})
  } else {
    res.status(404).json({message: "Record not found"})
  }
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id
  const count = await cityModel.delete(id)
  if (count) {
    res.status(200).json({deleted: 'success'})
  } else {
    res.status(404).json({message: "Record not found"})
  }
})


module.exports = router;