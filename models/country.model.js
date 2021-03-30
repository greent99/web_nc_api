const db = require('../utils/db');

module.exports = {
  all() {
    return db('country');
  },

  async single(id) {
    const countrys = await db('country').where('country_id', id);
    if (countrys.length === 0) {
      return null;
    }

    return countrys[0];
  },

  add(country) {
    return db('country').insert(country);
  },

  update(id,changes) {
    return db('country').where('country_id', id).update(changes);
  },

  delete(id){
    return db('country').where('country_id', id).del()
  }
};
