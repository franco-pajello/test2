const contenedorRequire = require('../../contenedores/contenedorArchivos.js');
const data = './src//database/data.json';
const fs = require('fs');
class productoDaoArchivo extends contenedorRequire.Contenedor {
  constructor() {
    super(data);
  }
  async upDateProduct(id, body) {
    const archivoFormatoJs = await this.getAll();

    const buscandoIndiceProducto = await archivoFormatoJs.findIndex((producto) => producto._id == id);

    archivoFormatoJs[buscandoIndiceProducto] = {
      producto: body.producto,
      precio: body.precio,
      img_url: body.img_url,
      stock: body.stock,
      categoria: body.categoria,
      cantidad: 1,
      _id: id,
      __v: 0,
    };
    let archivoFormatoTxt = JSON.stringify(archivoFormatoJs);

    await fs.promises.writeFile(this.ruta, archivoFormatoTxt);
    return archivoFormatoJs[buscandoIndiceProducto];
  }
}

module.exports = { productoDaoArchivo };
