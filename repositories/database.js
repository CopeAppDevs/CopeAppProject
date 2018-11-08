var colors, common, connect, mongoose;

colors = require("colors");

mongoose = require("mongoose");

common = require("../schemas/common");

connect = function(dbHost) {
  return mongoose.connect('mongodb://' + dbHost + '/CopeApp', {
    useNewUrlParser: true
  }, function(err) {
    if (!err) {
      console.log(colors.green("Dropping database CopeApp at " + dbHost));
      mongoose.connection.db.dropDatabase();
      return console.log(colors.green("Dropped"));
    } else {
      return console.log(colors.red("Unable to connect to mongodb at " + dbHost));
    }
  });
};

exports.createDatabase = function(dbHost) {
  var connection, populateDatabase;
  populateDatabase = function() {
    var admin, admins, i, j, k, len, len1, len2, role, roles, saveAdmins, saveRole, saveSchool, school, schools;
    console.log(colors.green("Populating..."));
    roles = [
      {
        role: "student",
        description: "The role for the common student"
      }, {
        role: "moderator",
        description: "The role for a moderator"
      }, {
        role: "principal",
        description: "The role for the school principal"
      }, {
        role: "manager",
        description: "The role for a local school manager"
      }, {
        role: "admin",
        description: "The role for the admin"
      }
    ];
    saveRole = function(r) {
      var role;
      role = new common.Role(r);
      return role.save(function(err, savedrole) {
        if (!err) {
          return console.log(("Persisted role " + savedrole.role + " with id " + savedrole._id).yellow);
        } else {
          return console.log(("Error persisting " + role.role + " caused by\n " + err).red);
        }
      });
    };
    for (i = 0, len = roles.length; i < len; i++) {
      role = roles[i];
      saveRole(role);
    }
    schools = [
      {
        name: "Copernico",
        address: "Via Garavaglia 11"
      }
    ];
    saveSchool = function(s) {
      var school;
      school = new common.School(s);
      return school.save(function(err, savedschool) {
        if (!err) {
          return console.log(("Persisted school " + savedschool.name + " with id " + savedschool._id).yellow);
        } else {
          return console.log(("Error persisting " + school.name + " caused by\n " + err).red);
        }
      });
    };
    for (j = 0, len1 = schools.length; j < len1; j++) {
      school = schools[j];
      saveSchool(school);
    }
    admins = [
      {
        firstName: "Fabio",
        lastName: "Tessaro",
        username: "FabioTex99",
        password: "antepo71!fama",
        email: "fakemail@butreal.com"
      }
    ];
    saveAdmins = function(a) {
      var admin;
      admin = new common.Student(a);
      return admin.save(function(err, savedadmin) {
        if (!err) {
          return console.log(("Persisted admin " + savedadmin.firstName + " " + savedadmin.lastName + " with id " + savedadmin._id).yellow);
        } else {
          return console.log(("Error persisting " + admin.name + " caused by\n " + err).red);
        }
      });
    };
    for (k = 0, len2 = admins.length; k < len2; k++) {
      admin = admins[k];
      saveAdmins(admin);
    }
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
