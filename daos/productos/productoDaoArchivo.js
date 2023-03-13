const contenedorRequire = require('../../contenedores/contenedorArchivos.js');
const data = './data/data.json';

class productoDaoArchivo extends contenedorRequire.Contenedor {
    constructor() {
        super(data);
    }
}
new productoDaoArchivo();

module.exports = { productoDaoArchivo };
