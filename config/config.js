require('dotenv').config({
  path: require('path').resolve(process.cwd(), process.env.NODE_ENV + '.env'),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 8080,
  TIPO_PERSISTENCIA: process.env.TIPO_PERSISTENCIA || 'mongo',
  EMAILADMIN: process.env.EMAILADMIN || 'francopajello@gmail.com',
  PASSEMAILADMIN: process.env.PASSEMAILADMIN || 'dsycrdenpdrtlzpn',
  HOST: process.env.HOST || 'mongodb+srv://franco-pajello:tJ7LmKYYZwptLS9G@cluster0.8t2nx9j.mongodb.net/ecommerce',
  LOCALHOST: process.env.LOCALHOST || '127.0.0.1',
};
