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
  deleteItemIdCarritoidDatosService,
  deleteCarritoDatosService,
} = require('../service/datos.js');
const test = require('../config/config.js').TEST;
async function getDatosController(req, res) {
  try {
    const isAuthenticated = req.isAuthenticated();
    const user = req.isAuthenticated() ? ({ username, password, email, foto, telefono, edad, admin } = req.user) : false;
    const getDatosServices = await getDatosService(isAuthenticated, user);

    if (getDatosServices) {
      return test == 'true' ? res.json(getDatosServices) : res.render('pages/index', getDatosServices);
    }
    return test == 'true' ? res.json({ user: 'usuario no logeado' }) : res.redirect('/login');
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
    test ? res.json(postCategoriasDatosServices) : res.render(postCategoriasDatosServices);
  } catch (error) {
    res.json({ error: true, msg: 'error al seleccionar la categoria' });
  }
}
async function postUploadfileController(req, res, next) {
  try {
    const { body } = req;
    const postUploadfileDatosServices = await postUploadfileDatosService(body, req, next);
    return test ? res.status(201).json(postUploadfileDatosServices) : res.redirect('/');
  } catch (error) {
    res.json({ error: 404 });
  }
}
async function putIdController(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const putIdDatosServices = await putIdDatosService(id, body, req, next);
    return test ? res.json(putIdDatosServices) : res.redirect('/');
  } catch (error) {
    res.json({ error: 'error al cargar el producto' });
  }
}
async function deleteIdController(req, res, next) {
  try {
    const { id } = req.params;
    const user = req.isAuthenticated() ? ({ username, password, email, foto, telefono, edad, admin } = req.user) : false;
    const deleteIdDatosServices = await deleteIdDatosService(id, user, req, next);
    return test == 'true' ? res.json({ sucesses: true }) : res.render('pages/index', deleteIdDatosServices);
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
async function deleteItemIdCarritoidController(req, res) {
  try {
    const { id } = req.params;
    const user = req.isAuthenticated() ? ({ username, password, email, foto, telefono, edad, admin } = req.user) : false;
    const deleteIdCarritoidDatosServices = await deleteItemIdCarritoidDatosService(id, user);

    return res.render('pages/carrito', deleteIdCarritoidDatosServices);
  } catch (error) {
    res.json({ error: 404 });
  }
}
async function deleteIdCarritoidController(req, res) {
  try {
    const { id } = req.params;
    const user = req.isAuthenticated() ? ({ username, password, email, foto, telefono, edad, admin } = req.user) : false;
    const deleteIdCarritoidDatosServices = await deleteIdCarritoidDatosService(id, user);

    return res.render('pages/carrito', deleteIdCarritoidDatosServices);
  } catch (error) {
    res.json({ error: 404 });
  }
}
async function deleteCarritoController(req, res) {
  await deleteCarritoDatosService();
  return res.redirect('/api/carrito');
}
async function rutaInexistenteController(req, res) {
  try {
    const rutaInexistenteDatosServices = await rutaInexistenteDatosService(req.path);

    res.json(rutaInexistenteDatosServices);
  } catch (error) {
    res.json({ error: 'error, ruta inexixtente' });
  }
}

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
  deleteItemIdCarritoidController,
  rutaInexistenteController,
};
