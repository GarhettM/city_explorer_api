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
  this.forecast = wParam.weather.description;
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
    // console.log(resultFromSuper);
    let newLocation = new Location(resultFromSuper.body[0], city);
    res.send(newLocation);
    // console.log(resultFromSuper.body[0]);
    
    })
    .catch(error => {
      console.log(error);
      res.send(error).status(500);
    });

});

app.get('/weather', (req, res) =>  {
  const url = `http://api.weatherbit.io/v2.0/forecast/daily`
  const city = req.query.city;
  const myKey = process.env.WEATHER_API_KEY;
  // console.log(req.query)
  
  const superQuery  = {
  key: myKey,
  lat: req.query.latitude,
  lon: req.query.longitude,
  format: 'json',
  limit: 8,
  };

  superagent.get(url).query(superQuery).then(resultFromSuper  =>  {
    console.log(resultFromSuper.body.data[0]);
    let weatherApp = resultFromSuper.body.data.map(current => {  
 
      return new Weather(current);
    
    });
    res.send(weatherApp);
  })
    .catch(error => {
      console.log(error);
      res.send(error).status(500);
    });  


});





app.listen(PORT, () => {
  // console.log('We are on ', PORT);
});
