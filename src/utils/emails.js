const { createTransport } = require('nodemailer');
const config = require('../config/config.js');
const { logger } = require('../logs/logWinston.js');
let productos = '';

async function emailDeRegistro(email, username, edad, telefono) {
  const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: config.EMAILADMIN,
      pass: config.PASSEMAILADMIN,
    },
  });

  const mailOptions = {
    from: 'Servidor Node.js',
    to: email,
    subject: 'su registro fue exitoso',
    html: `<h1><span style="color: green;">BIENVENID@ ${username}</span></h1>`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (err) {
    logger.log('error', '127.0.0.1 - log error', err);
  }

  //EMAIL NUEVO REGISTRO  AL ADMIN

  const transporte = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: config.EMAILADMIN,
      pass: config.PASSEMAILADMIN,
    },
  });

  const mailOption = {
    from: 'Servidor Node.js',
    to: config.EMAILADMIN,
    subject: 'nuevo registro de usuario',
    html: `<h1><span style="color: green;">nombre: ${username}, edad: ${edad}, tel: ${telefono}</span></h1>`,
  };
  try {
    await transporte.sendMail(mailOption);
  } catch (err) {
    logger.log('error', '127.0.0.1 - log error', err);
  }
}
async function emailConfirmacionCompra(email, username, producto) {
  await producto.forEach((element) => {
    productos += `producto: ${element.producto}
             precio: $${element.precio}
             cantidad: ${element.cantidad}`;
  });

  const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: config.EMAILADMIN,
      pass: config.PASSEMAILADMIN,
    },
  });

  const mailOptions = {
    from: 'Servidor Node.js',
    to: email,
    subject: 'su compra fue exitosa',
    html: `<h1><span style="color: green;">${username} gracias por su compra:${productos}</span></h1>`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (err) {
    logger.log('error', '127.0.0.1 - log error', err);
  }
}
module.exports = { emailDeRegistro, emailConfirmacionCompra };
