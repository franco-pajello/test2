const { logger } = require('./logs/logWinston.js');
const accountSid = 'AC74f334cf659173f73c077d004fbcb971';
const authToken = '47d6e5501104f2ca7cb9eb3cf5de631c';
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
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+5491136006967',
    })
    .then((message) => logger.log('info', 'confirmando pedido mediante wsp', message.sid));

  //msj de texto

  client.messages
    .create({
      body: 'su pedido ha sido recibido y se encuentra en proceso.',
      messagingServiceSid: 'MG4ab468cea1cda0f1723c360a1b126b6a',
      to: '+541168074794',
    })
    .then((message) => logger.log('info', '127.0.0.1 - confirmando pedido mediante msj de text', message.sid));
}
module.exports = { twilio };
