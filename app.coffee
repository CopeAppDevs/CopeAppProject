express = require("express")
http = require("http")
path = require("path")
colors = require("colors")
webpush = require("web-push")
router = require("./routes/router")
argv = require('minimist')(process.argv.slice(2));
winston = require('winston')

app = express()

if argv.p == null or typeof argv.p == "undefined"
	console.log("The port for Node.JS must be specified".red)
	process.exit(1);
else
	unless isNaN(argv.p)
		if argv.p >= 3000 and argv.p < 4000
			app.set('port', argv.p)
		else
			console.log("Node.JS must run on a port between 3000 and 3999".red)
			process.exit(1);
	else
		console.log("The port argument must be a number".red)
		process.exit(1);

app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(app.router)
app.use('/', express.static(__dirname + '/public'))

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use('/views/res', express.static(__dirname + '/views/res'))

router.defineRoutes(app)

if app.get('env') == 'development'
	app.use(express.errorHandler())

http.createServer(app).listen(app.get('port'), () -> console.log('Express server listening on port '+app.get('port')))
