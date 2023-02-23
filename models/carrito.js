const { Schema } = require('mongoose');
const modeloDelcarrito = new Schema({
    producto: { type: String, require: true },
    precio: { type: Number, require: true },
    img_url: { type: String, require: true },
    stock: { type: Number, require: true },
    cantidad: { type: Number, require: true },
});

module.exports = { modeloDelcarrito };
