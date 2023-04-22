require('dotenv').config({
  path: require('path').resolve(process.cwd(), process.env.NODE_ENV + '.env'),
});
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  TIPO_PERSISTENCIA: process.env.TIPO_PERSISTENCIA,
  EMAILADMIN: process.env.EMAILADMIN,
  PASSEMAILADMIN: process.env.PASSEMAILADMIN,
  HOST: process.env.HOST,
  LOCALHOST: process.env.LOCALHOST,
  TEST: process.env.Test,
  PASSWORDREDIS: process.env.PASSWORDREDIS,
  HOSTREDIS: process.env.HOSTREDIS,
  ACCOUNTSIDTWILIO: process.env.ACCOUNTSIDTWILIO,
  AUTHTOKENTWILIO: process.env.AUTHTOKENTWILIO,
  MESSAGINGSERVICESID: process.env.MESSAGINGSERVICESID,
  CLIENTMESSAGESTO: process.env.CLIENTMESSAGESTO,
  WHATSAPPTWILIOFROM: process.env.WHATSAPPTWILIOFROM,
  WHATSAPPTWILIOTO: process.env.WHATSAPPTWILIOTO,
};
