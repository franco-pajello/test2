const {
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
  /// CARRITO
  getCarritoDatosService,
  postCarritoDatosService,
  postFinalizarcompraDatosService,
  deleteIdCarritoidDatosService,
  deleteCarritoDatosService,
  rutaInexistenteDatosService,
} = require('../service/datos.js');
const admin = true;
const { postUploadfileValidations, putIdValisations, deleteIdValidations } = require('../validations/validaciones.js');
async function getDatosController(req, res) {
  try {
    const isAuthenticated = req.isAuthenticated();
    const user = req.isAuthenticated() ? ({ username, password, email, foto, telefono, edad } = req.user) : false;
    const getDatosServices = await getDatosService(isAuthenticated, user);

    if (getDatosServices) {
      return res.json(getDatosServices);
      /*  return res.render('pages/index', getDatosServices) */
    }
    /* return res.redirect('/login') */
    return res.json({ user: 'usuario no logeado' });
  } catch (error) {
    return res.json({ error: 'error inesperado' });
  }
}
async function getShowsessionController(req, res) {
  try {
    const getShowsessionDatosServices = await getShowsessionDatosService();
    res.json(getShowsessionDatosServices);
  } catch (error) {
    return res.json({ error: 'error al cargar los dstos' });
  }
}
async function getFailloginController(req, res) {
  try {
    const getFailloginDatosServices = getFailloginDatosService();
    if (getFailloginDatosServices) {
      return res.render(getFailloginDatosServices);
    }
    return res.json({ error: 'ocurrio un error al logearse' });
  } catch (error) {
    return res.json({ error: 404 });
  }
}
async function getFailsignupController(req, res) {
  try {
    const getFailsignupDatosServices = getFailsignupDatosService();

    if (getFailsignupDatosServices) {
      return res.render('partials/signupFail');
    }
    return res.json({ error: 'ocurrio un error al registrare' });
  } catch (error) {
    return res.json({ error: 404 });
  }
}
async function getLoginController(req, res) {
  try {
    const getLoginDatosServices = await getLoginDatosService();

    return res.render(getLoginDatosServices);
  } catch (error) {
    return res.json({ error: 404 });
  }
}
async function getSignupController(req, res) {
  try {
    const getSignupDatosServices = await getSignupDatosService();
    return res.render(getSignupDatosServices);
  } catch (error) {
    return res.json({ error: 'error al cargar la pagina del registro' });
  }
}
async function getLogoutController(req, res) {
  try {
    const getLogoutDatosServices = await getLogoutDatosService();

    req.session.destroy((err) => {
      if (err) res.send('error inesperado');
      return res.redirect(getLogoutDatosServices);
    });
  } catch (error) {
    res.json({ error: 404 });
  }
}
async function postCategoriasController(req, res) {
  try {
    const { body } = req;
    const postCategoriasDatosServices = await postCategoriasDatosService(body);
    res.json(postCategoriasDatosServices);
    /*  res.render(postCategoriasDatosServices) */
  } catch (error) {
    res.json({ error: true, msg: 'error al seleccionar la categoria' });
  }
}
async function postUploadfileController(req, res, next) {
  const postUploadfileValidation = await postUploadfileValidations(req);
  if (postUploadfileValidation) {
    next;
  } else {
    return res.send({ error: 404, descripcion: 'no autorizado', método: 'post' });
  }
  try {
    const { body } = req;
    const postUploadfileDatosServices = await postUploadfileDatosService(body);
    return res.status(201).json(postUploadfileDatosServices);
    /*         return res.redirect(postUploadfileDatosServices)
     */
  } catch (error) {
    res.json({ error: 404 });
  }
}
async function putIdController(req, res, next) {
  const putIdValisation = await putIdValisations(req);

  if (putIdValisation) {
    next;
  } else {
    return res.send({ error: 404, descripcion: 'no autorizado', método: 'post' });
  }
  try {
    const { id } = req.params;
    const { body } = req;
    const putIdDatosServices = await putIdDatosService(id, body);
    res.json(putIdDatosServices);
  } catch (error) {
    res.json({ error: 'error al cargar el producto' });
  }
}
async function deleteIdController(req, res, next) {
  const deleteIdValidation = await deleteIdValidations(req);

  if (deleteIdValidation) {
    next;
  } else {
    return res.send({ error: 404, descripcion: 'no autorizado', método: 'post' });
  }

  try {
    const { id } = req.params;
    const deleteIdDatosServices = await deleteIdDatosService(id);
    res.json(deleteIdDatosServices);
  } catch (error) {
    res.json({ error: 'error a eliminar el producto' });
  }
}

// CARRITO

async function getCarritoController(req, res) {
  try {
    const isAuthenticated = req.isAuthenticated();
    const user = req.isAuthenticated() ? ({ username, password, email, foto, telefono, edad } = req.user) : false;
    const getCarritoDatosServices = await getCarritoDatosService(isAuthenticated, user);
    /*   console.log(getCarritoDatosServices.productoCarrito) */
    res.render('pages/carrito', getCarritoDatosServices);
  } catch (error) {
    res.json({ error: 404 });
  }
}
async function postCarritoController(req, res) {
  try {
    const isAuthenticated = req.isAuthenticated();
    const user = req.isAuthenticated() ? ({ username, password, email, foto, telefono, edad } = req.user) : false;
    const { body } = req;
    const postCarritoDatosServices = await postCarritoDatosService(isAuthenticated, user, body);

    return postCarritoDatosServices == '/login' ? res.redirect('/login') : res.render('pages/carrito', postCarritoDatosServices);
  } catch (error) {
    res.json({ error: 404 });
  }
}
async function postFinalizarcompraController(req, res) {
  try {
    const isAuthenticated = req.isAuthenticated();
    const { username, email } = req.user;
    await postFinalizarcompraDatosService(isAuthenticated, username, email);
    res.redirect('api/carrito');
  } catch (error) {
    res.json({ error: 404 });
  }
}
async function deleteIdCarritoidController(req, res) {
  try {
    const { id } = req.params;

    const deleteIdCarritoidDatosServices = await deleteIdCarritoidDatosService(id);

    deleteIdCarritoidDatosServices ? res.json({ success: true }) : res.json({ error: 'producto no encontrado' });
  } catch (error) {
    res.json({ error: 404 });
  }
}
async function deleteCarritoController(req, res) {
  const { username } = req.user;
  const deleteCarritoDatosServices = await deleteCarritoDatosService(username);
  res.render('pages/carrito', deleteCarritoDatosServices);
}
async function rutaInexistenteController(req, res) {
  try {
    const rutaInexistenteDatosServices = await rutaInexistenteDatosService(req.path);

    res.json(rutaInexistenteDatosServices);
  } catch (error) {
    res.json({ error: 'error, ruta inexixtente' });
  }
}
/* async function getSocketChat(Socket){
        try {
            Socket.on('msg', async (data) => {
                await chat.save(data);
                const todoElChat = await chat.getAll();
                io.sockets.emit('chatLista', todoElChat);
            });
        } catch (error) {
            logger.log('error', "127.0.0.1 - log error", error)
            res.json({ error: err, E: "aaaaaaaaaaaaaaaaaaaaaaaaa" });
        
}
} */

module.exports = {
  getDatosController,
  getShowsessionController,
  getFailloginController,
  getFailsignupController,
  getLoginController,
  getSignupController,
  getLogoutController,
  postCategoriasController,
  postUploadfileController,
  putIdController,
  deleteIdController,
  getCarritoController,
  postCarritoController,
  postFinalizarcompraController,
  deleteIdCarritoidController,
  deleteCarritoController,
  rutaInexistenteController,
  /*     getSocketChat */
};
