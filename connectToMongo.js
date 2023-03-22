const { connect } = require('mongoose');
const config = require('./config/config.js');
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
    console.log(this.value);
  }
  static getInstance() {
    if (!instance) {
      instance = new Singleton();
    }
    return instance;
  }
}

module.exports = { Singleton };
