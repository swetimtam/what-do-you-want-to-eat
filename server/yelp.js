const axios = require('axios');
const config = require('../config');

const baseURL = 'https://api.yelp.com/v3';

const getBusinesses = (longitude, latitude, location, offset) => {
  const options = {
    url: `${baseURL}/businesses/search`,
    headers: {
      Authorization: config.API_KEY,
    },
    params: {
      location,
      longitude,
      latitude,
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