var colors, connect, mongoose;

colors = require("colors");

mongoose = require("mongoose");

exports.mongoose = mongoose;

connect = function(dbHost) {
  return mongoose.connect('mongodb://' + dbHost + '/local', {
    useNewUrlParser: true
  }).then(function() {
    return console.log(colors.green("Connected to mongodb at " + dbHost));
  }, function(err) {
    console.error(colors.red("failed to connect to db at " + dbHost));
    return console.error(colors.red(err));
  });
};

exports.createDatabase = function(dbHost) {
  var connection;
  return connection = connect(dbHost);
};
