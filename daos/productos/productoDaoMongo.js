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
}
module.exports = { ProductoDaosMongo };
