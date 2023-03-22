const { Schema } = require('mongoose');
const modeloDelProducto = new Schema({
  producto: { type: String, require: false },
  precio: { type: Number, require: false },
  img_url: { type: String, require: false },
  stock: { type: Number, require: false },
  categoria: { type: String, require: false },
  cantidad: { type: Number, require: false },
});

module.exports = { modeloDelProducto };
