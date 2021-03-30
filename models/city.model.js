const db = require('../utils/db');

module.exports = {
  all() {
    return db('city');
  },

  async single(id) {
    const citys = await db('city').where('city_id', id);
    if (citys.length === 0) {
      return null;
    }

    return citys[0];
  },

  add(city) {
    return db('city').insert(city);
  },

  update(id,changes) {
    return db('city').where('city_id', id).update(changes);
  },

  delete(id){
    return db('city').where('city_id', id).del()
  }
};
