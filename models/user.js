//For mongoose schemas
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  age: Number,
  nationality: String,
  password: String,
});
const User = mongoose.model("userCol", userSchema);

module.exports = User;
