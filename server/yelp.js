const axios = require('axios');
const config = require('../config');

const baseURL = 'https://api.yelp.com/v3';

const getBusinesses = (longitude, latitude, location, offset) => {
  let location = longitude ? null : location;

  const options = {
    url: `${baseURL}/businesses/search`,
    headers: {
      Authorization: config.API_KEY,
    },
    params: {
      longitude,
      latitude,
      location,
      open_now: true,
      radius: 4000,
      limit: 50,
      offset,
      term: 'food',
    }
  }

  return axios(options);
};

module.exports = {
  getBusinesses,
};