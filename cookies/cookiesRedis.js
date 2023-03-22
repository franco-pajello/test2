const config = require('../config/config.js');
const { logger } = require('../logs/logWinston.js');
const redis = require('redis');
const session = require('express-session');
const client = redis.createClient({ legacyMode: true });
client
  .connect()
  .then(() => logger.log('info', '127.0.0.1 - conectado a redis'))
  .catch((error) => logger.log('error', '127.0.0.1 - log error', error));
const redisStore = require('connect-redis')(session);
const storeRedis = new redisStore({
  host: config.LOCALHOST,
  port: 6379,
  client,
  ttl: 3000,
});
module.exports = { storeRedis };
