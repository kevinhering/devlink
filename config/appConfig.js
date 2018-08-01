// env variables
const dotenv = require('dotenv');
const { parsed } = dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const isProd = process.env.NODE_ENV === 'production';

const config = {
  getKey: function() {
    return isProd ? process.env.KEY : parsed.KEY;
  },

  getMongoURI: function() {
    const user = isProd ? process.env.DB_USER : parsed.DB_USER;
    const pwd = isProd ? process.env.DB_PASS : parsed.DB_PASS;
    const host = isProd ? process.env.DB_HOST : parsed.DB_HOST;
    return `mongodb://${user}:${pwd}@${host}`;
  },

  getPort: function() {
    return process.env.PORT || 5000;
  }
};

module.exports = config;
