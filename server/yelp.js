const axios = require('axios');
const config = require('../config');

const baseURL = 'https://api.yelp.com/v3';

const getBusinesses = () => {
  const options = {
    url: `${baseURL}/businesses/search`,
    headers: {
      Authorization: config.API_KEY,
    },
    params: {
      location: '12322 ditmore dr garden grove, ca 92841',
      open_now: true,
      radius: 4000,
      limit: 50
    }
  }

  return axios(options);
};

module.exports = {
  getBusinesses,
};