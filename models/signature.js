const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SignatureSchema = new Schema({
  name: String,
  email: String,
  address: String,
  date: Date
});

module.exports = SignatureSchema;
