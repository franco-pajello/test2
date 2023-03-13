const mongoose = require('mongoose');
const modeloUsuario = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    edad: { type: String, require: true },
    calle: { type: String, require: true },
    numero: { type: String, require: true },
    telefono: { type: String, require: true },
    foto: { type: String, require: true },
});
const Usuarios = mongoose.model('usuarios', modeloUsuario);
module.exports = Usuarios;
