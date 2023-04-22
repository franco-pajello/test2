const { logger } = require('../logs/logWinston.js');
const config = require('../config/config.js');
const accountSid = config.ACCOUNTSIDTWILIO;
const authToken = config.AUTHTOKENTWILIO;
const client = require('twilio')(accountSid, authToken);

let productos = '';

async function twilio(producto, username) {
  await producto.forEach((element) => {
    productos += `producto: ${element.producto}
             precio: $${element.precio}
             cantidad: ${element.cantidad} \n`;
  });

  client.messages
    .create({
      body: `nuevo pedido de ${username},  ${productos}`,
      from: config.WHATSAPPTWILIOFROM,
      to: config.WHATSAPPTWILIOTO,
    })
    .then((message) => logger.log('info', 'confirmando pedido mediante wsp', message.sid));

  //msj de texto

  client.messages
    .create({
      body: 'su pedido ha sido recibido y se encuentra en proceso.',
      messagingServiceSid: config.MESSAGINGSERVICESID,
      to: config.CLIENTMESSAGESTO,
    })
    .then((message) => logger.log('info', '127.0.0.1 - confirmando pedido mediante msj de text', message.sid));
}
module.exports = { twilio };
