const db = require('../utils/db');

module.exports = {
  all() {
    return db('actor');
  },

  async single(id) {
    const actors = await db('actor').where('actor_id', id);
    if (actors.length === 0) {
      return null;
    }

    return actors[0];
  },

  add(actor) {
    return db('actor').insert(actor);
  },

  update(id,changes) {
    return db('actor').where('actor_id', id).update(changes);
  },

  delete(id){
    return db('actor').where('actor_id', id).del()
  }
};
