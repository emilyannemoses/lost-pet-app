/**************
EMBEDDED SCHEMA
**************/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Cat = require('./cat');

var OwnerSchema = new Schema({
    email: String
});

var Owner = mongoose.model('Owner', OwnerSchema);
module.exports = Owner;
