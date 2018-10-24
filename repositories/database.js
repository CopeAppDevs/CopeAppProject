var colors, connect, mongoose, shoolSchema;

colors = require("colors");

mongoose = require("mongoose");

shoolSchema = require("../schemas/school");

connect = function(dbHost) {
  return mongoose.connect('mongodb://' + dbHost + '/local', {
    useNewUrlParser: true
  });
};

exports.createDatabase = function(dbHost) {
  var connection, populateDatabase;
  populateDatabase = function() {
    console.log(colors.green("Populating..."));
    return console.log(colors.green("Populated"));
  };
  connection = connect(dbHost);
  return connection.then(function() {
    console.log(colors.green("Connected to mongodb at " + dbHost));
    return populateDatabase();
  }, function(err) {
    console.error(colors.red("failed to connect to db at " + dbHost));
    return console.error(colors.red(err));
  });
};
