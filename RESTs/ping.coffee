Errors = require("../errors/errors")

exports.do = (req, res, next) ->
	res.send("Ping!")

exports.doError = (req, res, next) ->
	expressError = Errors.ExpressError
	next(new expressError("Cannot ping the service", 500))
