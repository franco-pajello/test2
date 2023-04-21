const ProductosDaoMongo = require('./productos/productoDaoMongo.js').ProductoDaosMongo;
const carritoDaoMongo = require('./carrito/carritoDaoMongo.js').CarritoDaosMongo;
const chatDaoMongo = require('./chat/chatDaoMongo.js').chatDaosMongo;
const sessionesMongoAtlas = require('./sessions/sessionMongoAtlas.js').session;
const productoDaoarchivo = require('./productos/productoDaoArchivo.js').productoDaoArchivo;
const carritoDaoarchivo = require('./carrito/carritoDaoArchivo.js').carrito;
const chatDaoarchivo = require('./chat/chatArchivo.js').chatDaosArchivo;
const config = require('../config/config.js');

const instancias = [
  {
    nombre: sessionesMongoAtlas,
    id: 'mongo',
    descripcion: 'sesion',
  },
  {
    nombre: carritoDaoMongo,
    id: 'mongo',
    descripcion: 'carrito',
  },
  {
    nombre: ProductosDaoMongo,
    id: 'mongo',
    descripcion: 'producto',
  },
  {
    nombre: chatDaoMongo,
    id: 'mongo',
    descripcion: 'chat',
  },

  {
    nombre: productoDaoarchivo,
    id: 'archivo',
    descripcion: 'producto',
  },
  {
    nombre: carritoDaoarchivo,
    id: 'archivo',
    descripcion: 'carrito',
  },
  {
    nombre: chatDaoarchivo,
    id: 'archivo',
    descripcion: 'chat',
  },
  {
    nombre: sessionesMongoAtlas,
    id: 'archivo',
    descripcion: 'sesion',
  },
];

const instancia = instancias.filter((i) => i.id == config.TIPO_PERSISTENCIA);
const resultado = {
  [instancia[0].descripcion]: instancia[0].nombre,
  [instancia[1].descripcion]: instancia[1].nombre,
  [instancia[2].descripcion]: instancia[2].nombre,
  [instancia[3].descripcion]: instancia[3].nombre,
};
module.exports = { resultado };
