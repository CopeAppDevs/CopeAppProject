colors = require("colors")
mongoose = require("mongoose")
shoolSchema = require("../schemas/school")

connect = (dbHost) ->
  mongoose.connect('mongodb://'+dbHost+'/local', {
    useNewUrlParser: true
  })

exports.createDatabase = (dbHost) ->

  populateDatabase = () ->
    console.log(colors.green("Populating..."))
    copernico = new shoolSchema.School({

      schoolName: "Copernico",
      address: "Via garavaglia 7",
      phone: "335unguunguungu",
      mail: "copernico]ungu.it",
      website: "www.copernico.bo.it",

      students: [{
        firstName: "claudia",
        lastName: "unguendoli",
        username: "ungukla",
        password: "VincioGay",
        email: "ungu@ungu.it",
        roles: [{
          role: "student",
          description: "ungu"
        }]
      }],
      teachers: [{
        firstName: "claudio",
        lastName: "unguendoli",
        username: "ungukla",
        password: "VincioGay",
        email: "ungu@ungu.it",
        roles: [{
          role: "teacher",
          description: "ungu"
        },{
          role: "ungu",
          description: "ungu"
        }]
      }],
      classes: [{
        section: "A",
        year: 2,
        subject: "linguistico",
        location: "412"
      }]
    })
    copernico.save((err, savedObj) ->
      if err
        console.error(colors.red(err))
    )
    console.log(colors.green("Populated"))

  connection = connect(dbHost)
  connection.then(() ->
      console.log(colors.green("Connected to mongodb at "+dbHost))
      populateDatabase()
    ,(err) ->
      console.error(colors.red("failed to connect to db at "+dbHost))
      console.error(colors.red(err))
    )
