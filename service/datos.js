const {
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
} = require('../database/datos.js');
let productosArray = false;
let productoCarrito = [];
const { twilio } = require('../twilioWspMsj.js');
const { emailConfirmacionCompra } = require('../emails.js');
const { logger } = require('../logs/logWinston.js');
const admin = false;
let usuarioLogeado = false;

async function getDatosService(isAuthenticated, user) {
  try {
    if (isAuthenticated) {
      if (!productosArray) {
        productosArray = await getAllProductoDatabase();

        return {
          producto: productosArray,
          usuarioLogeado: user,
          admin: admin,
        };
      }
      return {
        producto: productosArray,
        usuarioLogeado: user,
        admin: admin,
      };
    }

    return false;
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function getShowsessionDatosService() {
  try {
    return req.session;
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function getFailloginDatosService() {
  try {
    return 'partials/loginFail';
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function getFailsignupDatosService() {
  try {
    return 'partials/signupFail';
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function getLoginDatosService() {
  try {
    return 'partials/login';
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function getSignupDatosService() {
  try {
    return 'partials/signup';
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return false;
  }
}
async function getLogoutDatosService() {
  try {
    return `http://127.0.0.1:8080`;
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function postCategoriasDatosService(body) {
  try {
    if (body.categoria == 'todo') {
      productosArray = await getAllProductoDatabase();
      return (
        'pages/index',
        {
          producto: productosArray,
          usuarioLogeado: usuarioLogeado,
          admin: admin,
        }
      );
    } else {
      productosArray = await getByAllProductoDatabase(body);
      return (
        'pages/index',
        {
          producto: productosArray,
          usuarioLogeado: usuarioLogeado,
          admin: admin,
        }
      );
    }
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function postUploadfileDatosService(body) {
  try {
    const getSaveProductoDb = await getSaveProductoDatabase(body);
    return getSaveProductoDb;
    /*    return '/'; */
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function putIdDatosService(id, body) {
  try {
    return await getUpDateByIdProductoDatabase(id, body);
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function deleteIdDatosService(id) {
  try {
    let filtrandoProducto = await getDeleteByIdProductoDatabase(id);
    console.log(filtrandoProducto);
    if (filtrandoProducto == false) {
      return false;
    } else {
      return { success: true };
    }
  } catch (error) {
    return error;
  }
}

////// CARRITO

async function getCarritoDatosService(isAuthenticated, user) {
  try {
    if (isAuthenticated) {
      const buscandoUsuario = await getUsuarioDatabase(username);

      let _idUsuario = buscandoUsuario._id;

      const buscandoCarrito = await getByIdProductoCarritoDatabase(_idUsuario);
      let arrayCarrito = buscandoCarrito ? buscandoCarrito.producto : [];
      return {
        productoCarrito: arrayCarrito,
        usuarioLogeado: user,
      };
    }
    return {
      productoCarrito: productoCarrito,
      usuarioLogeado: usuarioLogeado,
    };
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function postCarritoDatosService(isAuthenticated, user, body) {
  try {
    if (isAuthenticated) {
      const buscandoUsuario = await getUsuarioDatabase(username);

      let _idUsuario = buscandoUsuario._id;

      const idProducto = await body.id;

      const buscandoCarrito = await getByIdProductoCarritoDatabase(_idUsuario);
      let arrayCarrito = buscandoCarrito ? await buscandoCarrito.producto : [];

      const buscandoProductoDb = await getByIdProductoDatabase(idProducto);

      if (buscandoCarrito == undefined || buscandoCarrito == null) {
        await getSaveCarritoProducto(buscandoProductoDb, idProducto, _idUsuario);

        return {
          productoCarrito: arrayCarrito,
          usuarioLogeado: user,
        };
      } else {
        const indiceEncontrado = arrayCarrito.findIndex((producto) => producto._id == idProducto);

        if (indiceEncontrado < 0) {
          await getUpDatePushProductoCarrito(idProducto, buscandoProductoDb, _idUsuario);
          return {
            productoCarrito: arrayCarrito,
            usuarioLogeado: user,
          };
        } else {
          let cantidad = buscandoCarrito.producto[indiceEncontrado].cantidad;

          await getUpDateByIdProductoCarrito(cantidad, indiceEncontrado, _idUsuario);

          return {
            productoCarrito: arrayCarrito,
            usuarioLogeado: user,
          };
        }
      }
    }
    return '/login';
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function postFinalizarcompraDatosService(isAuthenticated, username, email) {
  try {
    if (isAuthenticated) {
      const buscandoUsuario = await getUsuarioDatabase(username);
      let _idUsuario = buscandoUsuario._id;

      const buscandoCarrito = await getByIdProductoCarritoDatabase(_idUsuario);

      let productos = await buscandoCarrito.producto;

      await twilio(productos, username);
      await emailConfirmacionCompra(email, username, productos);

      await getDeleteByIdProductoCarrito(_idUsuario);
    }
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function deleteIdCarritoidDatosService(id) {
  try {
    let filtrandoProducto = await getDeleteByIdProductoCarrito(id);

    if (filtrandoProducto == false) {
      return 'producto no encontrado';
    } else {
      return true;
    }
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return;
  }
}
async function deleteCarritoDatosService(username) {
  try {
    const buscandoUsuario = await getUsuarioDatabase(username);
    let _idUsuario = buscandoUsuario._id;

    await getDeleteByIdProductoCarrito(_idUsuario);
    return {
      productoCarrito: productoCarrito,
      usuarioLogeado: usuarioLogeado,
    };
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function rutaInexistenteDatosService() {
  try {
    let darrayCarritoime = new Date();
    logger.log('warn', 'ruta inexistente', [{ path: req.path, Time: darrayCarritoime }]);
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
  }
}
module.exports = {
  getDatosService,
  getShowsessionDatosService,
  getFailloginDatosService,
  getFailsignupDatosService,
  getLoginDatosService,
  getSignupDatosService,
  getLogoutDatosService,
  postCategoriasDatosService,
  postUploadfileDatosService,
  putIdDatosService,
  deleteIdDatosService,
  getCarritoDatosService,
  postCarritoDatosService,
  postFinalizarcompraDatosService,
  deleteIdCarritoidDatosService,
  deleteCarritoDatosService,
  rutaInexistenteDatosService,
};
