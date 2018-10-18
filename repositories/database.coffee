colors = require("colors")
mongoose = require("mongoose")

exports.mongoose = mongoose

connect = (dbHost) ->
  mongoose.connect('mongodb://'+dbHost+'/local', {
    useNewUrlParser: true
  }).then(() ->
    console.log(colors.green("Connected to mongodb at "+dbHost))
  ,(err) ->
    console.error(colors.red("failed to connect to db at "+dbHost))
    console.error(colors.red(err))
  )

exports.createDatabase = (dbHost) ->
  connection = connect(dbHost)
