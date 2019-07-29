const mongoose = require("mongoose");
const { mongoURI } = require("./default.json");

module.exports = function() {
  return mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
};
