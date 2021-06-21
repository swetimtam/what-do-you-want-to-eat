const express = require('express');
const path = require('path');
const yelp = require('./yelp');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/businesses/search', (req, res) => {
  const { longitude, latitude, location, yelpOffset } = req.query;

  yelp.getBusinesses(longitude, latitude, location, yelpOffset)
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch((error) => {
      res.status(501).send(error);
    })
})

// changed for heroku
app.listen(process.env.PORT || 3000);
