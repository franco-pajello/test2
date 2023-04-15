const mongoStore = require('connect-mongo');
const config = require('../config/config.js');
const store = mongoStore.create({
  mongoUrl: config.HOST,
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  ttl: 600,
});
module.exports = { store };
