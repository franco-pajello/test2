const { Router } = require('express');
const session = require('express-session');
const { store } = require('../cookies/cookiesMongo.js');
const { storeRedis } = require('../cookies/cookiesRedis.js');
const { signup } = require('../passport/passportRegistro.js');
const { login } = require('../passport/loginPassport');
const passport = require('passport');
const routerDatos = Router();
const {
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
} = require('../controller/datos.js');

routerDatos.use(
  session({
    store: store,
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
  }),
);
routerDatos.use(
  session({
    store: storeRedis,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 86400000, //un dia
    },
    rolling: true,
    resave: true,
    secret: 'secreto',
    saveUninitialized: false,
  }),
);
routerDatos.use(passport.initialize());
routerDatos.use(passport.session());

routerDatos.get('/', getDatosController);
routerDatos.get('/showsession', getShowsessionController);
routerDatos.get('/faillogin', getFailloginController);
routerDatos.get('/failsignup', getFailsignupController);
routerDatos.get('/login', getLoginController);
routerDatos.get('/signup', getSignupController);
routerDatos.get('/logout', getLogoutController);
routerDatos.post('/categorias', postCategoriasController);
routerDatos.post(
  '/signup',
  passport.authenticate(signup, {
    successRedirect: '/',
    failureRedirect: '/failsignup',
  }),
);
routerDatos.post(
  '/login',
  passport.authenticate(login, {
    successRedirect: '/',
    failureRedirect: '/faillogin',
  }),
);
routerDatos.post('/uploadfile', postUploadfileController);
routerDatos.put('/:id', putIdController);
routerDatos.delete('/:id', deleteIdController);

/// CARRITO

routerDatos.get('/api/carrito', getCarritoController);
routerDatos.post('/api/carrito', postCarritoController);
routerDatos.post('/finalizarcompra', postFinalizarcompraController);
routerDatos.delete('/api/carrito/:id', deleteIdCarritoidController);
routerDatos.delete('/api/carrito/item/:id', deleteItemIdCarritoidController);
routerDatos.delete('/api/carrito', deleteCarritoController);

//RUTA INEXIXTENTE

routerDatos.get('*', rutaInexistenteController);

module.exports = { routerDatos };
