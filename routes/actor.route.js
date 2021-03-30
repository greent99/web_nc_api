const express = require('express');
const actorModel = require('../models/actor.model');
const schema = require('../schemas/actor.json');
const router = express.Router();

router.get('/', async function (req, res) {
  const list = await actorModel.all();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const actor = await actorModel.single(id);
  if (actor === null) {
    return res.status(204).end();
  }

  res.json(actor);
})

router.post('/', require('../middlewares/validate.mdw')(schema), async function (req, res) {
  const actor = req.body;
  const ids = await actorModel.add(actor);
  actor.actor_id = ids[0];
  res.status(201).json(actor);
})

router.put('/:id', require('../middlewares/validate.mdw')(schema), async function (req, res) {
  const id = req.params.id
  const changes = req.body;
  const count = await actorModel.update(id, changes);
  if (count) {
    res.status(200).json({updated: 'success'})
  } else {
    res.status(404).json({message: "Record not found"})
  }
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id
  const count = await actorModel.delete(id)
  if (count) {
    res.status(200).json({deleted: 'success'})
  } else {
    res.status(404).json({message: "Record not found"})
  }
})


module.exports = router;