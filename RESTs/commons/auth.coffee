basicAuth = require('basic-auth');
colors = require('colors');
url = require('url')
fs = require('fs');
path = require('path');

exports.asPAGE = (req, res, next) ->
	console.log("-----------------------------------------------------------------------------------------------------------".green)
	urlParts = url.parse(req.url, true)
	console.log("Incoming request incoming with path: \n\t path: -> \'"+urlParts.pathname+"\';")
	user = basicAuth(req)
	if not user? or typeof user == "undefined"
		console.log("AN ERROR OCCURRED".red)
		console.log("No Authentication header found in request")
		console.log("-----------------------------------------------------------------------------------------------------------".green)

		fs.exists(path.join("views", "unauthorized.jade"), (exists) ->
			if exists
				res.render(path.join("..", "views", "unauthorized.jade"), {reason: "An authentication header is needed"})
			else
				res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
				res.status(401);
				res.send({reason: "An authentication header is needed"})
		)
	else
		console.log("User authenticated with credentials: \n\t user -> \'"+user.name+"\';\n\t password -> \'"+user.pass+"\';")
		console.log("Forwarding request to the associated REST")
		console.log("-----------------------------------------------------------------------------------------------------------".green)
		req.authentication = user;
		next()

exports.asJSON = (req, res, next) ->
	console.log("-----------------------------------------------------------------------------------------------------------".green)
	urlParts = url.parse(req.url, true)
	console.log("Incoming request incoming with path: \n\t path: -> \'"+urlParts.pathname+"\';")
	user = basicAuth(req)
	if not user? or typeof user == "undefined"
		res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
		res.status(401);
		res.send({reason: "An authentication header is needed"})
	else
		console.log("User authenticated with credentials: \n\t user -> \'"+user.name+"\';\n\t password -> \'"+user.pass+"\';")
		console.log("Forwarding request to the associated REST")
		console.log("-----------------------------------------------------------------------------------------------------------".green)
		req.authentication = user;
		next()
