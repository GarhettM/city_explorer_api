'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors());

function Location(param) {
  this.formatted_query = param.display_name
  this.latitude = param.lat
}

app.get('/location', (req, res)  =>  {
  const location = require('./data/location.json');
  const getCoordLat = location[0].lat
  const getCoordLon = location[0].lon
  const coordinates = [];

  coordinates.push(getCoordLat);
  coordinates.push(getCoordLon);
  console.log(getCoordLat)

  res.send(coordinates);
});

app.get('/weather', (req, res) =>  {
  const weather = require('.data/weather.json')
});






app.listen(PORT, () => {
  console.log(PORT)
});