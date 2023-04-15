const express = require('express');
const APP = express();
const http = require('http').createServer(APP);
const io = require('socket.io')(http);

module.exports = { express, APP, http, io };
