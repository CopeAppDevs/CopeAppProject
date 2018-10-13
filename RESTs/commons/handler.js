(function() {
  var colors, fs, path;

  colors = require('colors');

  fs = require('fs');

  path = require('path');

  exports.asJSON = function(error, req, res, next) {
    if ((error != null) && !(typeof error === "undefined")) {
      if (error.name.startsWith("Express")) {
        console.log(colors.red("AN ERROR OCCURRED WITH CODE " + error.errorCode + ": \n" + error.stack));
        console.log("Responding with a json".green);
        res.status(message.errorCode);
        return res.send({
          code: error.errorCode,
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      } else {
        console.log(colors.red("AN ERROR OCCURRED: \n" + error.stack));
        console.log("Responding with a json".green);
        res.status(500);
        return res.send({
          code: 500,
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
    } else {
      return res.end();
    }
  };

  exports.asPAGE = function(error, req, res, next) {
    if ((error != null) && !(typeof error === "undefined")) {
      if (error.name.startsWith("Express")) {
        console.log(colors.red("AN ERROR OCCURRED WITH CODE " + error.errorCode + ": \n" + error.stack));
        return fs.exists(path.join("views", "exception.jade"), function(exists) {
          if (exists) {
            console.log("Responding with a .jade page".green);
            return res.render(path.join("..", "views", "exception.jade"), {
              code: error.errorCode,
              name: error.name,
              message: error.message,
              stack: error.stack
            });
          } else {
            console.log("Responding with a json".green);
            res.status(error.errorCode);
            return res.send({
              code: error.errorCode,
              name: error.name,
              message: error.message,
              stack: error.stack
            });
          }
        });
      } else {
        console.log(colors.red("AN ERROR OCCURRED WITH CODE 500: \n" + error.stack));
        return fs.exists(path.join("views", "exception.jade"), function(exists) {
          if (exists) {
            console.log("Responding with a .jade page".green);
            return res.render(path.join("..", "views", "exception.jade"), {
              code: 500,
              name: error.name,
              message: error.message,
              stack: error.stack
            });
          } else {
            console.log("Responding with a json".green);
            res.status(500);
            return res.send({
              code: 500,
              name: error.name,
              message: error.message,
              stack: error.stack
            });
          }
        });
      }
    } else {
      return res.end();
    }
  };

}).call(this);
