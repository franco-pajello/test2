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
  getDeleteItemIdProductoCarrito,
} = require('../database/datos.js');
const { postUploadfileValidations, putIdValisations, deleteIdValidations } = require('../validations/validaciones.js');
let productosArray = false;
let productoCarrito = [];
const { twilio } = require('../utils/twilioWspMsj.js');
const { emailConfirmacionCompra } = require('../utils/emails.js');
const { logger } = require('../logs/logWinston.js');
let usuarioLogeado = false;

async function getDatosService(isAuthenticated, user) {
  try {
    if (isAuthenticated) {
      if (!productosArray) {
        productosArray = await getAllProductoDatabase();

        return {
          producto: productosArray,
          usuarioLogeado: user,
          admin: user.admin,
        };
      }
      return {
        producto: productosArray,
        usuarioLogeado: user,
        admin: user.admin,
      };
    }

    return false;
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
    return `/`;
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
          admin: usuarioLogeado.admin,
        }
      );
    } else {
      productosArray = await getByAllProductoDatabase(body);
      return (
        'pages/index',
        {
          producto: productosArray,
          usuarioLogeado: usuarioLogeado,
          admin: usuarioLogeado.admin,
        }
      );
    }
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function postUploadfileDatosService(body, req, next) {
  const postUploadfileValidation = await postUploadfileValidations(req);
  if (postUploadfileValidation) {
    next;
  } else {
    return res.send({ error: 404, descripcion: 'no autorizado', método: 'post' });
  }
  try {
    const getSaveProductoDb = await getSaveProductoDatabase(body);
    productosArray = await getAllProductoDatabase();
    return getSaveProductoDb;
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function putIdDatosService(id, body, req, next) {
  const putIdValisation = await putIdValisations(req);
  if (putIdValisation) {
    next;
  } else {
    return res.send({ error: 404, descripcion: 'no autorizado', método: 'post' });
  }
  try {
    const getUpDateByIdProductoDatabases = await getUpDateByIdProductoDatabase(id, body);
    productosArray = await getAllProductoDatabase();
    return getUpDateByIdProductoDatabases;
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function deleteIdDatosService(id, user, req, next) {
  const deleteIdValidation = await deleteIdValidations(req);

  if (deleteIdValidation) {
    next;
  } else {
    return res.send({ error: 404, descripcion: 'no autorizado', método: 'post' });
  }
  try {
    await getDeleteByIdProductoDatabase(id);
    productosArray = await getAllProductoDatabase();
    return {
      producto: productosArray,
      usuarioLogeado: user,
      admin: user.admin,
    };
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

      const buscandoProductoDb = await getByIdProductoDatabase(idProducto);

      await getSaveCarritoProducto(buscandoProductoDb, idProducto, _idUsuario);
      const buscandoCarrito = await getByIdProductoCarritoDatabase(_idUsuario);
      let arrayCarrito = buscandoCarrito ? await buscandoCarrito.producto : [];
      return {
        productoCarrito: arrayCarrito,
        usuarioLogeado: user,
      };
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
      await getDeleteAllProducstoCarrito(_idUsuario);
    }
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return error;
  }
}
async function deleteIdCarritoidDatosService(idProducto, user) {
  try {
    const buscandoUsuario = await getUsuarioDatabase(user.username);
    let idCarrito = buscandoUsuario._id;
    const buscandoCarrito = await getByIdProductoCarritoDatabase(idCarrito);
    let arrayCarrito = buscandoCarrito ? await buscandoCarrito.producto : [];
    const producto = await arrayCarrito.find((e) => {
      return e._id == idProducto;
    });

    const indiceEncontrado = arrayCarrito.findIndex((producto) => producto._id == idProducto);

    await getDeleteByIdProductoCarrito(idCarrito, indiceEncontrado, producto);

    return {
      productoCarrito: arrayCarrito,
      usuarioLogeado: user,
    };
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return;
  }
}
async function deleteItemIdCarritoidDatosService(idProducto, user) {
  try {
    const buscandoUsuario = await getUsuarioDatabase(user.username);
    let idCarrito = buscandoUsuario._id;
    const buscandoCarrito = await getByIdProductoCarritoDatabase(idCarrito);
    let arrayCarrito = buscandoCarrito ? await buscandoCarrito.producto : [];
    const producto = await arrayCarrito.find((e) => {
      return e._id == idProducto;
    });

    await getDeleteItemIdProductoCarrito(idCarrito, producto);
    return {
      productoCarrito: arrayCarrito,
      usuarioLogeado: user,
    };
  } catch (error) {
    logger.log('error', '127.0.0.1 - log error', error);
    return;
  }
}
async function deleteCarritoDatosService(user) {
  try {
    await getDeleteAllProducstoCarrito(user._id);
    return;
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
  deleteItemIdCarritoidDatosService,
  rutaInexistenteDatosService,
};
