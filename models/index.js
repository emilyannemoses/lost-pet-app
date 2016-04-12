/****************************
CONNECTION TO HEROKU DATABASE
*****************************/
var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                      process.env.MONGOHQ_URL ||
                      "mongodb://localhost/project-01" );

var Cat = require('./cat');

module.exports.Cat = Cat;
module.exports.Owner = require('./owner');
