const ProductosDaoMongo = require('./productos/productoDaoMongo.js').ProductoDaosMongo;
const productoDaoFirebase = require('./productos/productoDaoFirebase.js').PoductosDaosFirebase;
const carritoDaoMongo = require('./carrito/carritoDaoMongo.js').CarritoDaosMongo;
const carritoDaoFirebase = require('./carrito/carritoDaoFirebase.js').CarritoDaosFirebase;
const chatDaoMongo = require('./chat/chatDaoMongo.js').chatDaosMongo;
const sessionesMongoAtlas = require('./sessions/sessionMongoAtlas.js').session;
const config = require('../config/config.js');
/* const { config } = require('dotenv');
config(); */

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
    nombre: productoDaoFirebase,
    id: 'firebase',
    descripcion: 'producto',
  },
  {
    nombre: carritoDaoFirebase,
    id: 'firebase',
    descripcion: 'carrito',
  },
  {
    nombre: carritoDaoFirebase,
    id: 'firebase',
    descripcion: 'carrito',
  },
  {
    nombre: carritoDaoFirebase,
    id: 'firebase',
    descripcion: 'carrito',
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
