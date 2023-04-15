const { connect } = require('mongoose');
const config = require('../config/config.js');
const { logger } = require('../logs/logWinston.js');
let instance = null;
async function connectMG() {
  try {
    await connect(config.HOST, {
      useNewUrlParser: true,
    });
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    throw 'no me conecte';
  }
}

class Singleton {
  constructor() {
    this.value = connectMG();
  }
  printValue() {
    logger.log('info', 'url de coneccion a localhost', this.value);
  }
  static getInstance() {
    if (!instance) {
      instance = new Singleton();
    }
    return instance;
  }
}

module.exports = { Singleton };
