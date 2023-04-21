const RedisStore = require('connect-redis');
const session = require('express-session');
const { logger } = require('../logs/logWinston.js');
const { createClient } = require('redis');
const config = require('../config/config.js');
const client = createClient({
  password: config.PASSWORDREDIS,
  socket: {
    host: config.HOSTREDIS,
    port: 16474,
  },
});

const RedisStoreSession = RedisStore(session);

const redisConnect = () => {
  try {
    client
      .connect()
      .then(() => logger.log('info', '127.0.0.1 - conectado a redis'))
      .catch((error) => logger.log('error', '127.0.0.1 - log error', error));
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
  }
};
module.exports = { RedisStoreSession, redisConnect, client };
