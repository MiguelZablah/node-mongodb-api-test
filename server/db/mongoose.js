var mongoose = require('mongoose');

// Conect to db and define tipe of promies
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};