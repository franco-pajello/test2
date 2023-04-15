const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const Usuarios = require('../models/usuarios.js');
const { isValidPassword } = require('./funcionesPassport/validacionContraseña');
const { logger } = require('../logs/logWinston.js');
const { Singleton } = require('../utils/connectToMongo.js');

Singleton.getInstance();

let login = new LocalStrategy(async (username, password, done) => {
  Usuarios.findOne({ username: `${username}` }, (err, user) => {
    if (err) {
      logger.log('error', '127.0.0.1 - error inexperado en logeo', err);
      return done(err);
    }
    if (!user) {
      logger.log('info', '127.0.0.1 - log info', 'no se encontro el usuario');
      return done(null, false);
    }
    if (!isValidPassword(user, password)) {
      logger.log('info', '127.0.0.1 - log info', 'contraseña invalida');
      return done(null, false);
    }

    return done(null, user);
  });
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

module.exports = { login };
