const fs = require('fs');
const chatRequire = require('../../contenedores/contenedorArchivos.js');
const data = './src/database/chat.json';
class chatDaosArchivo extends chatRequire.Contenedor {
  constructor() {
    super(data);
  }
  async save(msg) {
    try {
      const lecturaArchivo = await fs.promises.readFile(this.ruta, 'utf-8');
      const archivoFormatoJs = await JSON.parse(lecturaArchivo);
      await archivoFormatoJs.push(msg);
      const archivoFormatoTxt = JSON.stringify(archivoFormatoJs);
      await fs.promises.writeFile(this.ruta, archivoFormatoTxt);
      return archivoFormatoJs;
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async upDatePush(elemento, _id) {
    const archivoFormatoJs = await this.getAll();
    const indice = await archivoFormatoJs.findIndex((producto) => producto._id == _id);

    await archivoFormatoJs[indice].msgs.push(elemento.msgs[0]);
    const archivoFormatoTxt = JSON.stringify(archivoFormatoJs);
    await fs.promises.writeFile(this.ruta, archivoFormatoTxt);
    return archivoFormatoJs;
  }
}
module.exports = { chatDaosArchivo };
