colors = require('colors')
exceptionFormatter = require('exception-formatter')
fs = require('fs')
path = require('path')

exports.asJSON = (error, req, res, next) ->
	error.stack = exceptionFormatter(error.stack, {
		format: "html",
		basepath: path.resolve(__dirname);
	})
	if error? and not (typeof error == "undefined")
		if error.name.startsWith("Express")
			console.log(colors.red("AN ERROR OCCURRED WITH CODE "+error.errorCode+": \n"+copyStack))
			console.log("Responding with a json".green)
			res.status(message.errorCode);
			res.send({code: error.errorCode, name: error.name, message: error.message, stack: error.stack, copyStack: copyStack})
		else
			console.log(colors.red("AN ERROR OCCURRED: \n"+copyStack))
			console.log("Responding with a json".green)
			res.status(500);
			res.send({code: 500, name: error.name, message: error.message, stack: error.stack, copyStack: copyStack})
	else
		res.end()

exports.asPAGE = (error, req, res, next) ->
	copyStack = error.stack;
	error.stack = exceptionFormatter(error.stack, {
		format: "html",
		basepath: path.resolve(__dirname);
	})
	if error? and not (typeof error == "undefined")
		if error.name.startsWith("Express")
			console.log(colors.red("AN ERROR OCCURRED WITH CODE "+error.errorCode+": \n"+copyStack))
			fs.exists(path.join("views", "exception.pug"), (exists) ->
				if exists
					console.log("Responding with a .pug page".green)
					res.render(path.join("..", "views", "exception.pug"), {code: error.errorCode, name: error.name, message: error.message, stack: error.stack, copyStack: copyStack})
				else
					console.log("File .pug not found, responding with a json".green)
					res.status(error.errorCode);
					res.send({code: error.errorCode, name: error.name, message: error.message, stack: error.stack, copyStack: copyStack})
			)
		else
			console.log(colors.red("AN ERROR OCCURRED WITH CODE 500: \n"+copyStack))
			fs.exists(path.join("views", "exception.pug"), (exists) ->
				if exists
					console.log("Responding with a .pug page".green)
					res.render(path.join("..", "views", "exception.pug"), {code: 500, name: error.name, message: error.message, stack: error.stack, copyStack: copyStack})
				else
					console.log("File .pug not found, responding with a json".green)
					res.status(500);
					res.send({code: 500, name: error.name, message: error.message, stack: error.stack, copyStack: copyStack})
			)
	else
		res.end()
