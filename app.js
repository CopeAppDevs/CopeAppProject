(function() {
  var app, argv, colors, exitHook, express, fs, http, path, process, replace, router, webpush, winston;

  express = require("express");

  http = require("http");

  path = require("path");

  fs = require("fs");

  process = require("process");

  colors = require("colors");

  webpush = require("web-push");

  argv = require("minimist")(process.argv.slice(2));

  winston = require("winston");

  exitHook = require('exit-hook');

  replace = require('replace-in-file');

  router = require("./routes/router");

  app = express();

  if (argv.p === null || typeof argv.p === "undefined") {
    console.log("The port for Node.JS must be specified".red);
    process.exit(1);
  } else {
    if (!isNaN(argv.p)) {
      if (argv.p >= 3000 && argv.p < 4000) {
        app.set('port', argv.p);
      } else {
        console.log("Node.JS must run on a port between 3000 and 3999".red);
        process.exit(1);
      }
    } else {
      console.log("The port argument must be a number".red);
      process.exit(1);
    }
  }

  if (!argv.dev) {
    fs.appendFile("data/serverPIDs.db", app.get("port") + " " + process.pid + "\n", function(err) {
      if (err !== null && typeof err !== "undefined") {
        console.log("Error saving process PID to db".red);
        return process.exit(1);
      }
    });
  }

  app.use(express.logger('dev'));

  app.use(express.bodyParser());

  app.use(express.methodOverride());

  app.use(app.router);

  app.use('/', express["static"](__dirname + '/public'));

  app.set('views', __dirname + '/views');

  app.set('view engine', 'jade');

  app.use('/views/res', express["static"](__dirname + '/views/res'));

  router.defineRoutes(app);

  db.sequelize.authenticate().then(function() {
    return console.log('Connection has been established successfully.'.green);
  })["catch"](function(err) {
    return console.error('Unable to connect to the database:', err);
  });

  if (app.get('env') === 'development') {
    app.use(express.errorHandler());
  }

  http.createServer(app).listen(app.get('port'), function() {
    return console.log(colors.green('Express server listening on port ' + app.get('port')));
  });

  exitHook(function() {
    console.log("Exiting node...".red);
    return console.log("Done".green);
  });

}).call(this);
