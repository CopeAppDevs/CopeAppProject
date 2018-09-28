express = require("express")
http = require("http")
path = require("path")
fs = require("fs")
process = require("process")
colors = require("colors")
webpush = require("web-push")
router = require("./routes/router")
argv = require("minimist")(process.argv.slice(2));
winston = require("winston")
exitHook = require('exit-hook')
replace = require('replace-in-file')

app = express()

if (argv.d != null and typeof arg.d != "undefined") or (argv.dev != null and typeof arg.dev != "undefined")
	fs.appendFile("data/serverPIDs.db", app.get("port")+" "+process.pid+"\n", (err) ->
		if err == null and typeof err == "undefined"
			console.log("Error saving process PID to db".red)
			process.exit(1);
	)

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

exitHook(() ->
	console.log("Exiting node...".red)
	console.log("Done".green)
)
