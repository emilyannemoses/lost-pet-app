// Update your database connection to point to Heroku's database
var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/project-01");
mongoose.connect( process.env.MONGOLAB_URI ||
                      process.env.MONGOHQ_URL ||
                      "mongodb://localhost/project-01" );

var Cat = require('./cat');

module.exports.Cat = Cat;
module.exports.Owner = require('./owner');
