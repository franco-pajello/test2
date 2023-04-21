const fs = require('fs');
class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async getAll() {
    try {
      const lecturaArchivo = await fs.promises.readFile(this.ruta, 'utf-8');
      const archivoFormatoJs = JSON.parse(lecturaArchivo);
      return archivoFormatoJs;
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getById(id) {
    try {
      const archivoFormatoJs = await this.getAll();

      let buscandoId = await archivoFormatoJs.find((e) => e._id == id);

      return buscandoId;
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async getByAll(body) {
    try {
      const archivoFormatoJs = await this.getAll();
      let buscandoId = archivoFormatoJs.filter((e) => e.categoria == body.categoria);
      return buscandoId;
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async save(obj) {
    try {
      const archivoFormatoJs = await this.getAll();
      if (archivoFormatoJs.length == 0) {
        obj.id = 1;
        archivoFormatoJs.push(obj);

        let archivoFormatoTxt = JSON.stringify(archivoFormatoJs);

        await fs.promises.writeFile(this.ruta, archivoFormatoTxt);

        return { success: true };
      } else {
        let arraryId = archivoFormatoJs.map((e) => e._id);

        let sumandoId = Math.max(...arraryId);

        obj._id = sumandoId + 1;
        obj.cantidad = 1;
        obj.__v = 0;

        archivoFormatoJs.push(obj);

        let archivoFormatoTxt = JSON.stringify(archivoFormatoJs);

        await fs.promises.writeFile(this.ruta, archivoFormatoTxt);
        return obj;
      }
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async deleteById(id) {
    try {
      const archivoFormatoJs = await this.getAll();
      const indice = await archivoFormatoJs.findIndex((producto) => producto._id == id);
      await archivoFormatoJs.splice(indice, 1);

      let archivoFormatoTxt = JSON.stringify(archivoFormatoJs);

      await fs.promises.writeFile(this.ruta, archivoFormatoTxt);

      return archivoFormatoJs;
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async deleteAll(idCarrito) {
    const archivoFormatoJs = await this.getAll();
    const buscandoIndiceCarrito = await archivoFormatoJs.findIndex((producto) => producto._id == idCarrito);
    archivoFormatoJs[buscandoIndiceCarrito].producto = [];

    let archivoFormatoTxt = JSON.stringify(archivoFormatoJs);

    await fs.promises.writeFile(this.ruta, archivoFormatoTxt);

    return { success: true };
  }
}

module.exports = { Contenedor };
