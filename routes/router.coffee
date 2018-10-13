auth = require("../RESTs/commons/auth")
ping = require("../RESTs/commons/ping")
handler = require("../RESTs/commons/handler")

exports.defineRoutes = (app) ->
	app.get("/ping", auth.asPAGE, ping.do, handler.asPAGE)
	app.get("/ping/error", auth.asPAGE, ping.doError, handler.asPAGE)
