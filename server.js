/* if (process.env.NODE_ENV != "produccion") { require('dotenv').config(); } */
const config = require('./config/config.js');
console.log(config);

const express = require('express');
const APP = express();
const PORT = config.PORT;
const { routerDatos } = require('./router/datos.js');
const cors = require('cors');
const { logger } = require('./logs/logWinston.js');
const http = require('http').createServer(APP);
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
APP.use(cors({ origin: '*' }));
APP.set('view engine', 'ejs');
APP.set('views', './views');
APP.use('/public', express.static(__dirname + '/public'));
routerDatos.use('/public', express.static(__dirname + '/public'));
APP.use('/', routerDatos);
const io = require('socket.io')(http);
http.listen(PORT, () => {
  logger.log('info', `servidor htpp escuchado em el puerto http://localhost:${PORT}`);
});
