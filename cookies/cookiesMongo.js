const mongoStore = require('connect-mongo');
require('dotenv').config();
const store = mongoStore.create({
    mongoUrl: process.env.URLMONGO,
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    ttl: 600,
});
module.exports = { store };
