colors = require("colors")
mongoose = require("mongoose")
common = require("../schemas/common")

connect = (dbHost) ->
  mongoose.connect('mongodb://'+dbHost+'/CopeApp', {
    useNewUrlParser: true
  }, (err) ->
    unless err
      console.log(colors.green("Dropping database CopeApp at #{dbHost}"))
      mongoose.connection.db.dropDatabase()
      console.log(colors.green("Dropped"))
    else
      console.log(colors.red("Unable to connect to mongodb at #{dbHost}"))
  )

exports.createDatabase = (dbHost) ->

  populateDatabase = () ->
    console.log(colors.green("Populating..."))

    roles = [{role: "student", description: "The role for the common student"},
    {role: "moderator", description: "The role for a moderator"},
    {role: "principal", description: "The role for the school principal"},
    {role: "manager", description: "The role for a local school manager"},
    {role: "admin", description: "The role for the admin"}]
    saveRole = (r) ->
      role = new common.Role(r)
      role.save((err, savedrole) ->
        unless err
          console.log("Persisted role #{savedrole.role} with id #{savedrole._id}".yellow)
        else
          console.log("Error persisting #{role.role} caused by\n #{err}".red)
      )
    saveRole role for role in roles

    schools = [{name: "Copernico", address: "Via Garavaglia 11"}]
    saveSchool = (s) ->
      school = new common.School(s)
      school.save((err, savedschool) ->
        unless err
          console.log("Persisted school #{savedschool.name} with id #{savedschool._id}".yellow)
        else
          console.log("Error persisting #{school.name} caused by\n #{err}".red)
      )
    saveSchool school for school in schools

    admins = [{firstName: "Fabio", lastName: "Tessaro", username: "FabioTex99", password: "antepo71!fama", email: "fakemail@butreal.com"}]
    saveAdmins = (a) ->
      admin = new common.Student(a)
      admin.save((err, savedadmin) ->
        unless err
          console.log("Persisted admin #{savedadmin.firstName} #{savedadmin.lastName} with id #{savedadmin._id}".yellow)
        else
          console.log("Error persisting #{admin.name} caused by\n #{err}".red)
      )
    saveAdmins admin for admin in admins

    console.log(colors.green("Populated"))

  connection = connect(dbHost)
  connection.then(() ->
      console.log(colors.green("Connected to mongodb at "+dbHost))
      populateDatabase()
    ,(err) ->
      console.error(colors.red("failed to connect to db at "+dbHost))
      console.error(colors.red(err))
    )
