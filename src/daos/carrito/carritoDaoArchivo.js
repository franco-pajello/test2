const contenedorRequire = require('../../contenedores/contenedorArchivos.js');
const data = './src/database/carrito.json';
const fs = require('fs');

class carrito extends contenedorRequire.Contenedor {
  constructor() {
    super(data);
  }

  async save(buscandoProductoDb, idProducto, _idUsuario) {
    try {
      const lecturaArchivo = await fs.promises.readFile(data, 'utf-8');

      const archivoFormatoJs = await JSON.parse(lecturaArchivo);
      const buscandoCarrito = await archivoFormatoJs.find((producto) => producto._id == _idUsuario);

      if (buscandoCarrito) {
        const buscandoProducto = buscandoCarrito.producto;
        const buscandoIndiceProducto = await buscandoProducto.findIndex((producto) => producto._id == idProducto);
        const buscandoIndiceCarrito = await archivoFormatoJs.findIndex((producto) => producto._id == _idUsuario);
        if (buscandoIndiceProducto >= 0) {
          archivoFormatoJs[buscandoIndiceCarrito].producto[buscandoIndiceProducto].cantidad = archivoFormatoJs[buscandoIndiceCarrito].producto[buscandoIndiceProducto].cantidad + 1;

          let archivoFormatoTxt = JSON.stringify(archivoFormatoJs);

          await fs.promises.writeFile(data, archivoFormatoTxt);
          return archivoFormatoJs;
        } else {
          buscandoProductoDb.cantidad = 1;
          await archivoFormatoJs[buscandoIndiceCarrito].producto.push({
            _id: idProducto,
            producto: buscandoProductoDb.producto,
            precio: buscandoProductoDb.precio,
            img_url: buscandoProductoDb.img_url,
            stock: buscandoProductoDb.stock,
            categoria: buscandoProductoDb.categoria,
            cantidad: buscandoProductoDb.cantidad,
          });
          const archivoFormatoTxt = JSON.stringify(archivoFormatoJs);
          await fs.promises.writeFile(this.ruta, archivoFormatoTxt);
          return archivoFormatoJs;
        }
      } else {
        buscandoProductoDb.cantidad = 1;
        await archivoFormatoJs.push({
          _id: _idUsuario,
          producto: [
            {
              _id: idProducto,
              producto: buscandoProductoDb.producto,
              precio: buscandoProductoDb.precio,
              img_url: buscandoProductoDb.img_url,
              stock: buscandoProductoDb.stock,
              categoria: buscandoProductoDb.categoria,
              cantidad: buscandoProductoDb.cantidad,
            },
          ],
        });
        const archivoFormatoTxt = JSON.stringify(archivoFormatoJs);
        await fs.promises.writeFile(this.ruta, archivoFormatoTxt);
        return archivoFormatoJs;
      }
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async deleteByIdCarrito(idCarrito, indiceEncontrado) {
    // para restar la cantidad un item hasta 1 -
    try {
      const lecturaArchivo = await fs.promises.readFile(data, 'utf-8');

      const archivoFormatoJs = await JSON.parse(lecturaArchivo);
      const buscandoIndiceCarrito = await archivoFormatoJs.findIndex((producto) => producto._id == idCarrito);
      const cantidad = archivoFormatoJs[buscandoIndiceCarrito].producto[indiceEncontrado].cantidad;

      if (cantidad > 1) {
        archivoFormatoJs[buscandoIndiceCarrito].producto[indiceEncontrado].cantidad = cantidad - 1;

        let archivoFormatoTxt = JSON.stringify(archivoFormatoJs);

        await fs.promises.writeFile(this.ruta, archivoFormatoTxt);

        return archivoFormatoJs;
      }
      return;
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async deleteItem(idCarrito, producto) {
    try {
      // elimina un item sin importar su cantidad
      const archivoFormatoJs = await this.getAll();
      const buscandoIndiceCarrito = await archivoFormatoJs.findIndex((producto) => producto._id == idCarrito);
      const buscamosElementoId = producto._id;
      const carrito = archivoFormatoJs[buscandoIndiceCarrito].producto;
      const buscandoIndiceProducto = await carrito.findIndex((producto) => producto._id == buscamosElementoId);

      await archivoFormatoJs[buscandoIndiceCarrito].producto.splice(buscandoIndiceProducto, 1);

      let archivoFormatoTxt = JSON.stringify(archivoFormatoJs);

      await fs.promises.writeFile(this.ruta, archivoFormatoTxt);

      return archivoFormatoJs;
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = { carrito };
