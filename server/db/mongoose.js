var mongoose = require('mongoose');

// Conect to db and define tipe of promies
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};