colors = require('colors');
fs = require('fs');
path = require('path');

exports.asJSON = (error, req, res, next) ->
	if error? and not (typeof error == "undefined")
		if error.name.startsWith("Express")
			console.log(colors.red("AN ERROR OCCURRED WITH CODE "+error.errorCode+": \n"+error.stack))
			console.log("Responding with a json".green)
			res.status(message.errorCode);
			res.send({code: error.errorCode, name: error.name, message: error.message, stack: error.stack})
		else
			console.log(colors.red("AN ERROR OCCURRED: \n"+error.stack))
			console.log("Responding with a json".green)
			res.status(500);
			res.send({code: 500, name: error.name, message: error.message, stack: error.stack})
	else
		res.end()

exports.asPAGE = (error, req, res, next) ->
	if error? and not (typeof error == "undefined")
		if error.name.startsWith("Express")
			console.log(colors.red("AN ERROR OCCURRED WITH CODE "+error.errorCode+": \n"+error.stack))
			fs.exists(path.join("views", "exception.jade"), (exists) ->
				if exists
					console.log("Responding with a .jade page".green)
					res.render(path.join("..", "views", "exception.jade"), {code: error.errorCode, name: error.name, message: error.message, stack: error.stack})
				else
					console.log("Responding with a json".green)
					res.status(error.errorCode);
					res.send({code: error.errorCode, name: error.name, message: error.message, stack: error.stack})
			)
		else
			console.log(colors.red("AN ERROR OCCURRED WITH CODE 500: \n"+error.stack))
			fs.exists(path.join("views", "exception.jade"), (exists) ->
				if exists
					console.log("Responding with a .jade page".green)
					res.render(path.join("..", "views", "exception.jade"), {code: 500, name: error.name, message: error.message, stack: error.stack})
				else
					console.log("Responding with a json".green)
					res.status(500);
					res.send({code: 500, name: error.name, message: error.message, stack: error.stack})
			)
	else
		res.end()
