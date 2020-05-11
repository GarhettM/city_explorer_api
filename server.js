'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors());


app.get('/location', (req, res)  =>  {
  const location = require('./data/location.json');
  console.log(location);
});








app.listen(PORT, () => {
  console.log(PORT)
});