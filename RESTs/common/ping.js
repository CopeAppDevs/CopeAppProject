(function() {
  var Errors;

  Errors = require("../../errors/errors");

  exports["do"] = function(req, res, next) {
    return res.send("Ping!");
  };

  exports.doError = function(req, res, next) {
    var expressError;
    expressError = Errors.ExpressError;
    return next(new expressError("Cannot ping the service", 500));
  };

}).call(this);
