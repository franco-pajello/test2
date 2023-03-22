const { resultado } = require('../daos/iteradorDeInstancia.js');
const carritoConstructor = new resultado.carrito();
const objeto = new resultado.producto();
const Usuarios = require('../models/usuarios.js');
/* const Usuarios = require('../daos/usuarioFirebase/usuarioFirebase.js').usuarioFirebase */

async function getAllProductoDatabase() {
  return await objeto.getAll();
}
async function getByAllProductoDatabase(body) {
  return await objeto.getByAll(body);
}
async function getSaveProductoDatabase(body) {
  return await objeto.save({ ...body });
}
async function getUpDateByIdProductoDatabase(id, body) {
  return await objeto.upDateProduct(id, body);
}
async function getDeleteByIdProductoDatabase(id) {
  return await objeto.deleteById(id);
}
async function getByIdProductoCarritoDatabase(_idUsuario) {
  return await carritoConstructor.getById(_idUsuario);
}
async function getUsuarioDatabase(username) {
  return await Usuarios.findOne({ username });
}
async function getByIdProductoDatabase(idProducto) {
  return await objeto.getById(idProducto);
}
async function getSaveCarritoProducto(buscandoProductoDb, idProducto, _idUsuario) {
  return await carritoConstructor.save(buscandoProductoDb, idProducto, _idUsuario);
}
async function getUpDatePushProductoCarrito(idProducto, buscandoProductoDb, _idUsuario) {
  return await carritoConstructor.upDatePush(idProducto, buscandoProductoDb, _idUsuario);
}
async function getUpDateByIdProductoCarrito(cantidad, indiceEncontrado, _idUsuario) {
  carritoConstructor.upDateById(cantidad, indiceEncontrado, _idUsuario);
}
async function getDeleteByIdProductoCarrito(id) {
  return await carritoConstructor.deleteById(id);
}
async function getDeleteAllProducstoCarrito(cantidad, indiceEncontrado, _idUsuario) {
  return await carritoConstructor.upDateById(cantidad, indiceEncontrado, _idUsuario);
  /*  return await carritoConstructor.deleteAll(); */
}

module.exports = {
  getAllProductoDatabase,
  getByAllProductoDatabase,
  getSaveProductoDatabase,
  getUpDateByIdProductoDatabase,
  getDeleteByIdProductoDatabase,
  getByIdProductoCarritoDatabase,
  getUsuarioDatabase,
  getByIdProductoDatabase,
  getSaveCarritoProducto,
  getUpDatePushProductoCarrito,
  getUpDateByIdProductoCarrito,
  getDeleteByIdProductoCarrito,
  getDeleteAllProducstoCarrito,
};
