(function() {
  var auth, handler, ping;

  auth = require("../RESTs/commons/auth");

  ping = require("../RESTs/commons/ping");

  handler = require("../RESTs/commons/handler");

  exports.defineRoutes = function(app) {
    app.get("/ping", auth.asPAGE, ping["do"], handler.asPAGE);
    return app.get("/ping/error", auth.asPAGE, ping.doError, handler.asPAGE);
  };

}).call(this);
