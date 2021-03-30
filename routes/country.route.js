const express = require('express');
const countryModel = require('../models/country.model');
const schema = require('../schemas/country.json');
const router = express.Router();

router.get('/', async function (req, res) {
  const list = await countryModel.all();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const country = await countryModel.single(id);
  if (country === null) {
    return res.status(204).end();
  }

  res.json(country);
})

router.post('/', require('../middlewares/validate.mdw')(schema), async function (req, res) {
  const country = req.body;
  const ids = await countryModel.add(country);
  country.country_id = ids[0];
  res.status(201).json(country);
})

router.put('/:id', require('../middlewares/validate.mdw')(schema), async function (req, res) {
  const id = req.params.id
  const changes = req.body;
  const count = await countryModel.update(id, changes);
  if (count) {
    res.status(200).json({updated: 'success'})
  } else {
    res.status(404).json({message: "Record not found"})
  }
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id
  const count = await countryModel.delete(id)
  if (count) {
    res.status(200).json({deleted: 'success'})
  } else {
    res.status(404).json({message: "Record not found"})
  }
})


module.exports = router;