colors = require("colors")
mongoose = require("mongoose")
common = require("../schemas/common")

connect = (dbHost) ->
  mongoose.connect('mongodb://'+dbHost+'/local', {
    useNewUrlParser: true
  })

exports.createDatabase = (dbHost) ->

  populateDatabase = () ->
    console.log(colors.green("Populating..."))

    console.log(colors.green("Populated"))

  connection = connect(dbHost)
  connection.then(() ->
      console.log(colors.green("Connected to mongodb at "+dbHost))
      populateDatabase()
    ,(err) ->
      console.error(colors.red("failed to connect to db at "+dbHost))
      console.error(colors.red(err))
    )
