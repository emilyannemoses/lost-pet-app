// Update your database connection to point to Heroku's database
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project-01");

var Cat = require('./cat');
module.exports.Cat = Cat;
// module.exports.Owner = require('./owner');
