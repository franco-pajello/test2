const { resultado } = require('../daos/iteradorDeInstancia.js');
const carritoConstructor = new resultado.carrito();
const objeto = new resultado.producto();
const Usuarios = require('../models/usuarios.js');

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
async function getDeleteByIdProductoCarrito(idCarrito, indiceEncontrado, producto) {
  // para restar la cantidad un item hasta 1 -
  return await carritoConstructor.deleteByIdCarrito(idCarrito, indiceEncontrado, producto);
}
async function getDeleteItemIdProductoCarrito(idCarrito, producto) {
  // wlimina un item sin importar su cantidad
  return await carritoConstructor.deleteItem(idCarrito, producto);
}
async function getDeleteAllProducstoCarrito(idCarrito) {
  return await carritoConstructor.deleteAll(idCarrito);
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
  getDeleteByIdProductoCarrito,
  getDeleteAllProducstoCarrito,
  getDeleteItemIdProductoCarrito,
};
