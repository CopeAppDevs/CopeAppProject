var colors, exceptionFormatter, fs, path;

colors = require('colors');

exceptionFormatter = require('exception-formatter');

fs = require('fs');

path = require('path');

exports.asJSON = function(error, req, res, next) {
  error.stack = exceptionFormatter(error.stack, {
    format: "html",
    basepath: path.resolve(__dirname)
  });
  if ((error != null) && !(typeof error === "undefined")) {
    if (error.name.startsWith("Express")) {
      console.log(colors.red("AN ERROR OCCURRED WITH CODE " + error.errorCode + ": \n" + copyStack));
      console.log("Responding with a json".green);
      res.status(message.errorCode);
      return res.send({
        code: error.errorCode,
        name: error.name,
        message: error.message,
        stack: error.stack,
        copyStack: copyStack
      });
    } else {
      console.log(colors.red("AN ERROR OCCURRED: \n" + copyStack));
      console.log("Responding with a json".green);
      res.status(500);
      return res.send({
        code: 500,
        name: error.name,
        message: error.message,
        stack: error.stack,
        copyStack: copyStack
      });
    }
  } else {
    return res.end();
  }
};

exports.asPAGE = function(error, req, res, next) {
  var copyStack;
  copyStack = error.stack;
  error.stack = exceptionFormatter(error.stack, {
    format: "html",
    basepath: path.resolve(__dirname)
  });
  if ((error != null) && !(typeof error === "undefined")) {
    if (error.name.startsWith("Express")) {
      console.log(colors.red("AN ERROR OCCURRED WITH CODE " + error.errorCode + ": \n" + copyStack));
      return fs.exists(path.join("views", "exception.pug"), function(exists) {
        if (exists) {
          console.log("Responding with a .pug page".green);
          return res.render(path.join("..", "views", "exception.pug"), {
            code: error.errorCode,
            name: error.name,
            message: error.message,
            stack: error.stack,
            copyStack: copyStack
          });
        } else {
          console.log("File .pug not found, responding with a json".green);
          res.status(error.errorCode);
          return res.send({
            code: error.errorCode,
            name: error.name,
            message: error.message,
            stack: error.stack,
            copyStack: copyStack
          });
        }
      });
    } else {
      console.log(colors.red("AN ERROR OCCURRED WITH CODE 500: \n" + copyStack));
      return fs.exists(path.join("views", "exception.pug"), function(exists) {
        if (exists) {
          console.log("Responding with a .pug page".green);
          return res.render(path.join("..", "views", "exception.pug"), {
            code: 500,
            name: error.name,
            message: error.message,
            stack: error.stack,
            copyStack: copyStack
          });
        } else {
          console.log("File .pug not found, responding with a json".green);
          res.status(500);
          return res.send({
            code: 500,
            name: error.name,
            message: error.message,
            stack: error.stack,
            copyStack: copyStack
          });
        }
      });
    }
  } else {
    return res.end();
  }
};
