(function() {
  var commons, db;

  commons = require("./models/commons");

  db = require("./sequelize");

  exports.syncDrop = function() {
    var create, functions, i, relate;
    i = -1;
    functions = [
      function() {
        return db.sequelize.dropAllSchemas();
      }, function() {
        return db.sequelize.createSchema("copeapp");
      }, function() {
        return commons.User.sync({
          force: true
        });
      }, function() {
        return commons.School.sync({
          force: true
        });
      }, function() {
        return commons.Media.sync({
          force: true
        });
      }, function() {
        return commons.Memberships.sync({
          force: true
        });
      }, function() {
        return commons.Group.sync({
          force: true
        });
      }, function() {
        return commons.Memberships.hasMany(commons.Group, {
          as: 'group'
        }).add(0);
      }
    ];
    create = function() {
      i++;
      console.log(("Create number " + (i + 1)).cyan);
      if (i + 1 < functions.length) {
        return functions[i]().then(function() {
          return create();
        });
      } else {
        return functions[i]();
      }
    };
    relate = function() {

      /*
      console.log("Relating1...".rainbow)
      commons.User.belongsTo(commons.Memberships, {as: 'memberships'})
      console.log("Relating2...".rainbow)
      commons.User.belongsTo(commons.School, {as: 'school'})
      console.log("Relating3...".rainbow)
      commons.Memberships.hasMany(commons.Group, {as: 'group'})
       */
    };
    return create();
  };

}).call(this);
