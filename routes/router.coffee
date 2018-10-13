auth = require("../RESTs/common/auth")
ping = require("../RESTs/ping")
handler = require("../RESTs/common/handler")

exports.defineRoutes = (app) ->
	app.get("/ping", auth.asPAGE, ping.do, handler.asPAGE)
	app.get("/ping/error", auth.asPAGE, ping.doError, handler.asPAGE)
