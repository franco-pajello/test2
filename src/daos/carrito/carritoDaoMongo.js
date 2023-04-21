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
  async save(buscandoProductoDb, idProducto, _idUsuario) {
    try {
      const buscandoCarrito = await this.getById(_idUsuario);
      if (buscandoCarrito) {
        let arrayCarrito = buscandoCarrito ? await buscandoCarrito.producto : [];
        const indiceEncontrado = arrayCarrito.findIndex((producto) => producto._id == idProducto);
        if (indiceEncontrado >= 0) {
          let indice = `producto.${indiceEncontrado}.cantidad`;
          let cantidad = buscandoCarrito.producto[indiceEncontrado].cantidad;
          await this.schema.updateOne(
            { _id: _idUsuario },
            {
              $set: {
                [indice]: cantidad + 1,
              },
            },
          );
          return;
        }
        await this.schema.updateOne(
          { _id: _idUsuario },
          {
            $push: {
              producto: [
                {
                  _id: idProducto,
                  producto: buscandoProductoDb.producto,
                  precio: buscandoProductoDb.precio,
                  img_url: buscandoProductoDb.img_url,
                  stock: buscandoProductoDb.stock,
                  categoria: buscandoProductoDb.categoria,
                  cantidad: 1,
                },
              ],
            },
          },
        );
        return;
      }
      await this.nuevoElemento(buscandoProductoDb, idProducto, _idUsuario);

      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async deleteByIdCarrito(idCarrito, indiceEncontrado, producto) {
    try {
      let indice = `producto.${indiceEncontrado}.cantidad`;
      let cantidad = producto.cantidad;
      if (producto.cantidad > 1) {
        return await this.schema.updateOne(
          { _id: idCarrito },
          {
            $set: {
              [indice]: cantidad - 1,
            },
          },
        );
      }
      return;
    } catch (err) {
      return false;
    }
  }
  async deleteItem(idCarrito, producto) {
    try {
      let prodId = producto._id;
      return await this.schema.updateOne(
        { _id: idCarrito },
        {
          $pull: { producto: { _id: prodId } },
        },
      );
    } catch (err) {
      return false;
    }
  }
}
module.exports = { CarritoDaosMongo };
