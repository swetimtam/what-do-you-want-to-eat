const express = require('express');
const path = require('path');
const axios = require('axios');
const yelp = require('./yelp');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/businesses/search', (req, res) => {
  yelp.getBusinesses()
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch((error) => {
      res.status(501).send(error);
    })
})

app.listen(3000);
