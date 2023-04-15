const config = require('./src/config/config.js');
const express = require('express');
const APP = express();
const http = require('http').createServer(APP);
const io = require('socket.io')(http);
const PORT = config.PORT;
const cors = require('cors');
const { routerDatos } = require('./src/router/datos.js');
const { logger } = require('./src/logs/logWinston.js');

APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
APP.use(cors({ origin: '*' }));
APP.set('view engine', 'ejs');
APP.set('views', './src/views');
APP.use('/public', express.static(__dirname + '/src/public'));
routerDatos.use('/public', express.static(__dirname + '/src/public'));
APP.use('/', routerDatos);

require('./src/socket/soketChat.js')(io);

http.listen(PORT, () => {
  logger.log('info', `servidor htpp escuchado em el puerto http://localhost:${PORT}`);
});
