// env variables
const dotenv = require('dotenv');
const { parsed } = dotenv.config();

const config = {
  getKey: function() {
    return parsed.KEY;
  },

  getMongoURI: function() {
    const user = parsed.DB_USER;
    const pwd = parsed.DB_PASS;
    const host = parsed.DB_HOST;
    return `mongodb://${user}:${pwd}@${host}`;
  },

  getPort: function() {
    return process.env.PORT || 5000;
  }
};

module.exports = config;
