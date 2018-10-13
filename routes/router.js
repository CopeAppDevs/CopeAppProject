(function() {
  var auth, handler, ping;

  auth = require("../RESTs/common/auth");

  ping = require("../RESTs/ping");

  handler = require("../RESTs/common/handler");

  exports.defineRoutes = function(app) {
    app.get("/ping", auth.asPAGE, ping["do"], handler.asPAGE);
    return app.get("/ping/error", auth.asPAGE, ping.doError, handler.asPAGE);
  };

}).call(this);
