express = require("express")
http = require("http")
path = require("path")
fs = require("fs")
process = require("process")
colors = require("colors")
webpush = require("web-push")
argv = require("minimist")(process.argv.slice(2));
winston = require("winston")
exitHook = require('exit-hook')
replace = require('replace-in-file')
router = require("./routes/router")
db = require("./repositories/database")

app = express()

if argv.dbhost == null or typeof argv.dbhost == "undefined"
	app.set('dbhost', 'localhost:666')
else
	app.set('dbhost', argv.dbhost)

if argv.p == null or typeof argv.p == "undefined"
	console.log("The port for Node.JS must be specified".red)
	process.exit(1);
else
	unless isNaN(argv.p)
		if argv.p >= 8000 and argv.p < 9000
			app.set('port', argv.p)
		else
			console.log("Node.JS must run on a port between 8000 and 8999".red)
			process.exit(1);
	else
		console.log("The port argument must be a number".red)
		process.exit(1);

if (!argv.dev)
	fs.appendFile("data/serverPIDs.db", app.get("port")+" "+process.pid+"\n", (err) ->
		if err != null and typeof err != "undefined"
			console.log("Error saving process PID to db".red)
			process.exit(1);
	)

app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(app.router)
app.use('/', express.static(__dirname + '/public'))
app.use('/test', express.static(__dirname + '/test'))

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use('/views/res', express.static(__dirname + '/views/res'))

router.defineRoutes(app)
db.createDatabase(app.get('dbhost'))

if app.get('env') == 'development'
	app.use(express.errorHandler())

http.createServer(app).listen(app.get('port'), () -> console.log(colors.green('Express server listening on port '+app.get('port'))))

exitHook(() ->
	console.log("Exiting node...".red)
	console.log("Done".green)
)
