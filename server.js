'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();
const superagent = require('superagent')


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
  const url = `https://us1.locationiq.com/v1/search.php`

  const city = req.query.city;
  const myKey = process.env.GEOCODE_API_KEY;
  
  const superQuery  = {
    key: myKey,
    q: city,
    format: 'json',
    limit: 1,
  };
  
  superagent.get(url).query(superQuery).then(resultFromSuper  =>  {
    console.log(resultFromSuper);
    let newLocation = new Location(resultFromSuper.body[0], city);
    res.send(newLocation);
    console.log(resultFromSuper.body[0]);
    
    })
    .catch(error => {
      console.log(error);
      res.send(error).status(500);
    });

});

app.get('/weather', (req, res) =>  {
  const weather = require('./data/weather.json')
  const city = req.query.city;
  const weatherArr = weather.data.map(val =>  {
    return new Weather(val, city);
  })  
  res.send(weatherArr);
});






app.listen(PORT, () => {
  console.log('We are on ', PORT);
});