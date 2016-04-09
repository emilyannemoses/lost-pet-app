var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Owner = require('./owner');

var CatSchema = new Schema({
  petName: String,
  pictureUrl: String,
  dateLastSeen: String,
  locationLastSeen: String,
  owners: [Owner.schema]
});

//exporting the cat schema to mongoose and index.js model
var Cat = mongoose.model('Cat', CatSchema);
module.exports = Cat;
