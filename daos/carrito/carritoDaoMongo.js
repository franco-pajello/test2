const carritoRequire = require('../../contenedores/contenedorMongo.js');
let modelo = require('../../models/carrito.js').modeloDelcarrito;
async function nuevoElemento(elemento, id, _id) {
  const nuevoElemento = await new this.schema({
    _id: _id,
    producto: [
      {
        _id: id,
        producto: elemento._doc.producto,
        precio: elemento._doc.precio,
        img_url: elemento._doc.img_url,
        stock: elemento._doc.stock,
        categoria: elemento._doc.categoria,
        cantidad: elemento._doc.cantidad,
      },
    ],
  });
  nuevoElemento.save();
}
class CarritoDaosMongo extends carritoRequire.Contenedor {
  constructor() {
    super('carrito', modelo, nuevoElemento);
  }
  async save(elemento, id, _id) {
    try {
      await this.nuevoElemento(elemento, id, _id);

      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}
module.exports = { CarritoDaosMongo };
