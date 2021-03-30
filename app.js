const express = require('express');
const morgan = require('morgan');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.json({
    message: 'Hello from Sakila API'
  });
})

app.use('/api/film', require('./routes/film.route'));
app.use('/api/actor', require('./routes/actor.route'))
app.use('/api/category', require('./routes/category.route'))
app.use('/api/city', require('./routes/city.route'))
app.use('/api/country', require('./routes/country.route'))

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Sakila api is running at http://localhost:${PORT}`);
})