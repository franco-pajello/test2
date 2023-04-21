const productoRequire = require('../../contenedores/contenedorMongo.js');
let modelo = require('../../models/productos.js').modeloDelProducto;
async function nuevoElemento(elemento) {
  const nuevoElemento = new this.schema({
    producto: elemento.producto,
    precio: elemento.precio,
    img_url: elemento.img_url,
    stock: elemento.stock,
    categoria: elemento.categoria,
    cantidad: 1,
  });
  return await nuevoElemento.save();
}
class ProductoDaosMongo extends productoRequire.Contenedor {
  constructor() {
    super('productos', modelo, nuevoElemento);
  }
  async upDateProduct(id, body) {
    try {
      return await this.schema.updateOne(
        { _id: `${id}` },
        {
          $set: {
            _id: body._id,
            producto: body.producto,
            precio: body.precio,
            img_url: body.img_url,
            stock: body.stock,
            categoria: body.categoria,
            cantidad: 1,
          },
        },
      );
    } catch (error) {
      logger.log('error', '127.0.0.1 - log error', error);
    }
  }
}
module.exports = { ProductoDaosMongo };
