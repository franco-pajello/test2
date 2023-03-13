const { Schema } = require('mongoose');
const modeloDelcarrito = new Schema(

    {
        _id: { type: String, require: false },
        producto: [
            {
                _id: { type: String, require: false },
                producto: { type: String, require: true },
                precio: { type: Number, require: true },
                img_url: { type: String, require: true },
                stock: { type: Number, require: true },
                categoria: { type: String, require: true },
                cantidad: { type: Number, require: false },
            }
        ]
    }
);

module.exports = { modeloDelcarrito };
