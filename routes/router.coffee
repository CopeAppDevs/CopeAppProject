auth = require("../RESTs/auth")
ping = require("../RESTs/ping")
handler = require("../RESTs/handler")

exports.defineRoutes = (app) ->
	app.get("/ping", auth.asPAGE, ping.do, handler.asPAGE)
	app.get("/ping/error", auth.asPAGE, ping.doError, handler.asPAGE)