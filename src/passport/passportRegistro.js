const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../models/usuarios.js');
const passport = require('passport');
const { createHash } = require('./funcionesPassport/validacionContraseña.js');
const { emailDeRegistro } = require('../utils/emails.js');
const { logger } = require('../logs/logWinston.js');
const { Singleton } = require('../utils/connectToMongo.js');

Singleton.getInstance();

let signup = new LocalStrategy(
  {
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    Usuarios.findOne({ username: `${username}` }, function (err, user) {
      if (err) {
        logger.log('error', '127.0.0.1 - error inexperado en logeo', err);
        return done(err);
      }
      if (user) {
        logger.log('error', '127.0.0.1 - usuario exixtente passport registro');
        return done(null, false);
      }
      const newUser = {
        username: username.toLocaleLowerCase(),
        email: req.body.email,
        edad: req.body.edad,
        calle: req.body.calle,
        numero: req.body.numero,
        telefono: req.body.telefono,
        foto: req.body.foto,
        password: createHash(password),
      };

      Usuarios.create(newUser, (err, userWintId) => {
        if (err) {
          logger.log('error', '127.0.0.1 - error al crear el usuario', err);
          return done(err);
        }
        emailDeRegistro(req.body.email, username, req.body.edad, req.body.telefono);
        return done(null, userWintId);
      });
    });
  },
);
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});
module.exports = { signup };
