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
    var copernico;
    console.log(colors.green("Populating..."));
    copernico = new shoolSchema.School({
      schoolName: "Copernico",
      address: "Via garavaglia 7",
      phone: "335unguunguungu",
      mail: "copernico]ungu.it",
      website: "www.copernico.bo.it",
      students: [
        {
          firstName: "claudia",
          lastName: "unguendoli",
          username: "ungukla",
          password: "VincioGay",
          email: "ungu@ungu.it",
          roles: [
            {
              role: "student",
              description: "ungu"
            }
          ]
        }
      ],
      teachers: [
        {
          firstName: "claudio",
          lastName: "unguendoli",
          username: "ungukla",
          password: "VincioGay",
          email: "ungu@ungu.it",
          roles: [
            {
              role: "teacher",
              description: "ungu"
            }, {
              role: "ungu",
              description: "ungu"
            }
          ]
        }
      ],
      classes: [
        {
          section: "A",
          year: 2,
          subject: "linguistico",
          location: "412"
        }
      ]
    });
    copernico.save(function(err, savedObj) {
      if (err) {
        return console.error(colors.red(err));
      }
    });
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
