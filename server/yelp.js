const axios = require('axios');
const config = require('../config.js');

const baseURL = 'https://api.yelp.com/v3';

const getBusinesses = () => {
  const options = {
    url: `${baseURL}/businesses/search`,
    headers: {
      Authorization: config.API_KEY,
    },
    params: {
      location: 'CA 92841',
    }
  }
  return axios(options);
};

module.exports = {
  getBusinesses,
};