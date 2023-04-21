const { Schema } = require('mongoose');
const modeloDelchat = new Schema({
  _id: { type: String, require: false },
  msgs: [
    {
      autor: {
        id: { type: String, require: false },
        email: { type: String, require: false },
        edad: { type: Number, require: false },
        nombre: { type: String, require: false },
      },
      fecha: { type: String, require: false },
      msg: { type: String, require: false },
    },
  ],
});

module.exports = { modeloDelchat };
