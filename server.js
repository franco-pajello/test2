if (process.env.MODE != "produccion") {

    require('dotenv').config();
}
const { resultado } = require('./daos/iteradorDeInstancia.js');
const carritoConstructor = new resultado.carrito();
const objeto = new resultado.producto();
const chat = new resultado.chat();
const express = require('express');
/* const multer = require('multer'); */
const APP = express();
const PORT = process.env.PORT
const http = require('http').createServer(APP);
/* const { Router } = express; */
const cors = require('cors');
const io = require('socket.io')(http);
const session = require('express-session');
const passport = require('passport');
const { signup } = require('./passport/passportRegistro.js')
const { login } = require('./passport/loginPassport');
const { store } = require('./cookies/cookiesMongo.js');
const { storeRedis } = require('./cookies/cookiesRedis.js');
const { logger } = require("./logs/logWinston.js");
const Usuarios = require('./models/usuarios.js');
let productosArray = false;
let productoCarrito = [];
const { twilio } = require("./twilioWspMsj.js")
const { emailConfirmacionCompra } = require("./emails.js")
//ADMIN
const admin = false;
//USUARIO SESSION
let usuarioLogeado = false;

/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname +
            '-' +
            Date.now() +
            '.' +
            file.originalname.split('.').pop()
        );
    },
}); */
/* const upload = multer({ storage: storage }); */

APP.use(express.json());

APP.use(express.urlencoded({ extended: true }));

APP.use(cors({ origin: '*' }));

APP.set('view engine', 'ejs');

APP.set('views', './views');
APP.use('/public', express.static(__dirname + '/public'));
APP.use(
    session({
        store: store,
        secret: 'secreto',
        resave: false,
        saveUninitialized: false,
    })
);
APP.use(
    session({
        store: storeRedis,
        /*   secret: 'secreto',
          resave: false,
          saveUninitialized: false, */
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 86400000, //un dia
        },
        rolling: true,
        resave: true,
        secret: 'secreto',
        saveUninitialized: false,
    })
);
APP.use(passport.initialize());
APP.use(passport.session());

APP.listen(PORT, () => {
    logger.log('info', `servidor htpp escuchado em el puerto http://localhost:${PORT}`)
});

APP.get('', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            if (!productosArray) {
                productosArray = await objeto.getAll()
                const { username, password, email, foto, telefono, edad } = req.user;
                const user = { username, password, email, foto, telefono, edad };
                return res.render('pages/index', {
                    producto: productosArray,
                    usuarioLogeado: user,
                    admin: admin
                })

            }
            const { username, password, email, foto, telefono, edad } = req.user;
            const user = { username, password, email, foto, telefono, edad };
            return res.render('pages/index', {
                producto: productosArray,
                usuarioLogeado: user,
                admin: admin
            })

        }

        return res.redirect('/login')


    } catch (error) {
        logger.log('error', "127.0.0.1 - log error", error)
        res.json({ error: err });
    }
});
APP.get('/showsession', (req, res) => {
    try {
        res.json(req.session);

    } catch (error) {
        logger.log('error', "127.0.0.1 - log error", error)
        res.json({ error: err });
    }
});
APP.get('/faillogin', (req, res) => {
    try {

        res.render('partials/loginFail');
    } catch (error) {
        logger.log('error', "127.0.0.1 - log error", error)
        res.json({ error: err });
    }
});
APP.get('/failsignup', (req, res) => {
    try {

        res.render('partials/signupFail');
    } catch (error) {
        logger.log('error', "127.0.0.1 - log error", error)
        res.json({ error: err });
    }
});
APP.get('/login', async (req, res) => {
    try {
        res.render('partials/login');

    } catch (error) {
        logger.log('error', "127.0.0.1 - log error", error)
        res.json({ error: error });
    }
});
APP.get('/signup', async (req, res) => {
    try {
        res.render('partials/signup');
    } catch (error) {
        logger.log('error', "127.0.0.1 - log error", error)
        res.json({ error: error });
    }
});

APP.get('/logout', async (req, res) => {
    //metodo post
    try {

        req.session.destroy((err) => {
            if (err) res.send('error inesperado');
            return res.redirect(`http://127.0.0.1:${PORT}`);
        });
    } catch (error) {
        logger.log('error', "127.0.0.1 - log error", error)
        res.json({ error: err });
    }
});

APP.post("/categorias", async (req, res) => {
    const { body } = req
    if (body.categoria == 'todo') {
        productosArray = await objeto.getAll();
        return res.render('pages/index', {
            producto: productosArray,
            usuarioLogeado: usuarioLogeado,
            admin: admin
        });
    } else {
        productosArray = await objeto.getByAll(body)
        return res.render('pages/index', {
            producto: productosArray,
            usuarioLogeado: usuarioLogeado,
            admin: admin
        });
    }

})
APP.post(
    "/signup",
    passport.authenticate(signup, {
        successRedirect: '/',
        failureRedirect: 'failsignup',
    })
);
APP.post(
    '/login',
    passport.authenticate(login, {
        successRedirect: '/',
        failureRedirect: '/faillogin',
    })
);
APP.post(
    '/uploadfile',
    (req, res, next) => {
        if (admin == true) {
            next();
        } else {
            res.send({ error: 404, descripcion: 'no autorizado', método: 'post' });
        }
    },
    async (req, res) => {
        try {

            const { body } = req;
            objeto.save({ ...body });
            return res.redirect("/")
            /* res.json({ success: true, msg: 'producto cargado' }); */
        } catch (error) {
            logger.log('error', "127.0.0.1 - log error", error)
            res.json({ error: err });
        }
    }
);
//funciona por postman ↓

APP.put(
    '/:id',
    (req, res, next) => {
        if (admin == true) {
            next();
        } else {
            res.send({ error: 404, descripcion: 'no autorizado', método: 'post' });
        }
    },
    async (req, res) => {
        try {

            const { id } = req.params;
            const { body } = req;
            await objeto.upDateById(id, body);
            res.send('ok');
        } catch (error) {
            logger.log('error', "127.0.0.1 - log error", error)
            res.json({ error: err });
        }
    }
);

APP.delete(
    '/:id',
    (req, res, next) => {

        if (admin == true) {
            next();
        } else {
            res.send({ error: 404, descripcion: 'no autorizado', método: 'post' });
        }
    },
    async (req, res) => {

        try {

            const { id } = req.params;

            let filtrandoProducto = await objeto.deleteById(id);
            if (filtrandoProducto == false) {
                res.json({ error: 'producto no encontrado' });
            } else {
                res.json({ success: true });
            }
        } catch (error) {
            logger.log('error', "127.0.0.1 - log error", error)
            res.json({ error: err });
        }
    }
);

//RUTAS DEL CARRITO

APP.get('/api/carrito', async (req, res) => {
    try {
        if (req.isAuthenticated()) {

            const { username, password, email, foto, telefono, edad } = req.user;
            const user = { username, password, email, foto, telefono, edad };
            const buscandoUsuario = await Usuarios.findOne({ username });
            let _idUsuario = buscandoUsuario._id
            const buscandoCarrito = await carritoConstructor.getById(_idUsuario);
            let arrayCarrito = buscandoCarrito ? buscandoCarrito.producto : [];
            return res.render('pages/carrito', {
                productoCarrito: arrayCarrito,
                usuarioLogeado: user,
            });

        }
        return res.render('pages/carrito', {
            productoCarrito: productoCarrito,
            usuarioLogeado: usuarioLogeado,
        })



    } catch (error) {
        logger.log('error', "127.0.0.1 - log error", error)
        res.json({ error: error });
    }
});

APP.post('/api/carrito', async (req, res) => {
    try {

        if (req.isAuthenticated()) {
            let arrayCarrito = ''
            const { username, password, email, foto, telefono, edad } = req.user;
            const user = { username, password, email, foto, telefono, edad };
            const buscandoUsuario = await Usuarios.findOne({ username });
            let _idUsuario = buscandoUsuario._id
            const { body } = req;
            const idProducto = await body.id;
            const buscandoCarrito = await carritoConstructor.getById(_idUsuario);
            const buscandoProductoDb = await objeto.getById(idProducto);

            if (
                buscandoCarrito == undefined ||
                buscandoCarrito == null
            ) {

                await carritoConstructor.save(buscandoProductoDb, idProducto, _idUsuario)

                return res.render('pages/carrito', {
                    productoCarrito: arrayCarrito,
                    usuarioLogeado: user,
                });
            } else {
                arrayCarrito = await buscandoCarrito.producto

                const indiceEncontrado = arrayCarrito.findIndex(
                    (producto) => producto._id == idProducto
                );

                if (indiceEncontrado < 0) {

                    await carritoConstructor.upDatePush(idProducto, buscandoProductoDb, _idUsuario)

                    return res.render('pages/carrito', {
                        productoCarrito: arrayCarrito,
                        usuarioLogeado: user,
                    });

                } else {
                    let cantidad = buscandoCarrito.producto[indiceEncontrado].cantidad

                    await carritoConstructor.upDateById(cantidad, indiceEncontrado, _idUsuario)

                    return res.render('pages/carrito', {
                        productoCarrito: arrayCarrito,
                        usuarioLogeado: user,
                    });
                }

            }

        }
        return res.redirect('/login');

    } catch (error) {
        logger.log('error', "127.0.0.1 - log error", error)
        res.json({ error: error });
    }
});
APP.post('/finalizarcompra', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const { username, email } = req.user;
            const buscandoUsuario = await Usuarios.findOne({ username });
            let _idUsuario = buscandoUsuario._id
            const buscandoCarrito = await carritoConstructor.getById(_idUsuario);
            let productos = await buscandoCarrito.producto

            await twilio(productos, username)
            await emailConfirmacionCompra(email, username, productos)

            carritoConstructor.deleteById(_idUsuario)
        }
    } catch (error) {
        logger.log('error', "127.0.0.1 - log error", error)
        res.json({ error: error });
    }
})

APP.delete('/api/carrito/:id', async (req, res) => {
    try {

        const { id } = req.params;
        let filtrandoProducto = carritoConstructor.deleteById(id);

        if (filtrandoProducto == false) {
            res.json({ error: 'producto no encontrado' });
        } else {
            res.json({ success: true });
        }
    } catch (error) {
        logger.log('error', "127.0.0.1 - log error", error)
        res.json({ error: err });
    }
});

APP.delete('/api/carrito', async (req, res) => {
    try {

        await carritoConstructor.deleteAll();
        res.json({ success: true });
    } catch (error) {
        logger.log('error', "127.0.0.1 - log error", error)
        res.json({ error: err });
    }
});

io.on('connection', (Socket) => {
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
});

APP.get('*', (req, res) => {
    try {
        let darrayCarritoime = new Date()
        logger.log('warn', "ruta inexistente", [{ path: req.path, Time: darrayCarritoime }])
        res.json({ error: 404, descripcion: 'solicitud no encontrada' });
    } catch (error) {
        logger.log('error', "127.0.0.1 - log error", error)
        res.json({ error: true, msg: error });
    }
});


