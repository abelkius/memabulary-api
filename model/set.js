const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SetSchema = new Schema({
  title: String
});

module.exports = mongoose.model('Set', SetSchema);
