var basicAuth, colors, fs, path, url;

basicAuth = require('basic-auth');

colors = require('colors');

url = require('url');

fs = require('fs');

path = require('path');

exports.asPAGE = function(req, res, next) {
  var urlParts, user;
  console.log("-----------------------------------------------------------------------------------------------------------".green);
  urlParts = url.parse(req.url, true);
  console.log("Incoming request incoming with path: \n\t path: -> \'" + urlParts.pathname + "\';");
  user = basicAuth(req);
  if ((user == null) || typeof user === "undefined") {
    console.log("AN ERROR OCCURRED".red);
    console.log("No Authentication header found in request");
    console.log("-----------------------------------------------------------------------------------------------------------".green);
    return fs.exists(path.join(__dirname, "..", "..", "views", "unauthorized.pug"), function(exists) {
      if (exists) {
        return res.render(path.join(__dirname, "..", "..", "views", "unauthorized.pug"), {
          reason: "An authentication header is needed"
        });
      } else {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.status(401);
        return res.send({
          reason: "An authentication header is needed"
        });
      }
    });
  } else {
    console.log("User authenticated with credentials: \n\t user -> \'" + user.name + "\';\n\t password -> \'" + user.pass + "\';");
    console.log("Forwarding request to the associated REST");
    console.log("-----------------------------------------------------------------------------------------------------------".green);
    req.authentication = user;
    return next();
  }
};

exports.asJSON = function(req, res, next) {
  var urlParts, user;
  console.log("-----------------------------------------------------------------------------------------------------------".green);
  urlParts = url.parse(req.url, true);
  console.log("Incoming request incoming with path: \n\t path: -> \'" + urlParts.pathname + "\';");
  user = basicAuth(req);
  if ((user == null) || typeof user === "undefined") {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.status(401);
    return res.send({
      reason: "An authentication header is needed"
    });
  } else {
    console.log("User authenticated with credentials: \n\t user -> \'" + user.name + "\';\n\t password -> \'" + user.pass + "\';");
    console.log("Forwarding request to the associated REST");
    console.log("-----------------------------------------------------------------------------------------------------------".green);
    req.authentication = user;
    return next();
  }
};
