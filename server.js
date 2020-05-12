'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors());

function Location(param, city) {
  this.search_query = city;
  this.formatted_query = param.display_name;
  this.latitude = param.lat;
  this.longitude = param.lon;
}

function Weather(wParam, city)  {
  this.forcast = wParam.weather.description;
  this.time = wParam.valid_date;
}

app.get('/location', (req, res)  =>  {
  const location = require('./data/location.json');
  const city = req.query.city;
  let newLocation = new Location(location[0], city);
  
  // const getCoordLat = location[0].lat
  // const getCoordLon = location[0].lon
  // const coordinates = [];

  // coordinates.push(getCoordLat);
  // coordinates.push(getCoordLon);
  // console.log(getCoordLat)
  console.log(newLocation);
  res.send(newLocation);
});

app.get('/weather', (req, res) =>  {
  const weather = require('./data/weather.json')
  const city = req.query.city;
  const weatherArr  = [];
  for (let i = 0; i < weather.data.length; i++)  {
    let newWeather = new Weather(weather.data[i], city);
    console.log(newWeather);
    weatherArr.push(newWeather);
  }
  res.send(weatherArr);
});






app.listen(PORT, () => {
  console.log(PORT);
});