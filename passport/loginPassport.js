const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const Usuarios = require('../models/usuarios.js');
const { connect } = require('mongoose');
const { isValidPassword } = require('./funcionesPassport/validacionContraseña');
const { logger } = require("../logs/logWinston.js");
async function connectMG() {
    try {
        await connect(process.env.URLMONGO, { useNewUrlParser: true });
    } catch (e) {

        throw logger.log('error', "127.0.0.1 - no me pude conectar a mongo para passport login", e)
    }
}
connectMG()
    .then(() => logger.log('info', "127.0.0.1 - conectado a mongo para passport login "))
    .catch((err) => logger.log('error', "127.0.0.1 - no conectado a mongo para passport login", err));

let login = new LocalStrategy(async (username, password, done) => {

    Usuarios.findOne({ username: `${username}` }, (err, user) => {
        if (err) {
            logger.log('error', "127.0.0.1 - error inexperado en logeo", err)
            return done(err);
        }
        if (!user) {
            logger.log('info', "127.0.0.1 - log info", 'no se encontro el usuario')
            return done(null, false);
        }
        if (!isValidPassword(user, password)) {
            logger.log('info', "127.0.0.1 - log info", "contraseña invalida")
            return done(null, false);
        }

        return done(null, user);
    });
})

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    Usuarios.findById(id, done);
});

module.exports = { login }