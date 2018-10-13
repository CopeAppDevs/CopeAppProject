commons = require("./models/commons")
db = require("./sequelize")

exports.syncDrop = () ->

  i = -1
  functions = [
    () -> db.sequelize.dropAllSchemas(),
    () -> db.sequelize.createSchema("copeapp"),
    () -> commons.User.sync({force: true}),
    () -> commons.School.sync({force: true}),
    () -> commons.Media.sync({force: true}),
    () -> commons.Memberships.sync({force: true}),
    () -> commons.Group.sync({force: true}),
    () -> commons.Memberships.hasMany(commons.Group, {as: 'group'}).add(0)
  #  () -> commons.User.belongsTo(commons.Media, {as: 'media'}).has(0)
  ]
  create = () ->
    i++
    console.log("Create number #{i+1}".cyan)
    if i+1 < functions.length
      functions[i]().then(() ->
          create()
      )
    else
      functions[i]()

  relate = () ->
    ###
    console.log("Relating1...".rainbow)
    commons.User.belongsTo(commons.Memberships, {as: 'memberships'})
    console.log("Relating2...".rainbow)
    commons.User.belongsTo(commons.School, {as: 'school'})
    console.log("Relating3...".rainbow)
    commons.Memberships.hasMany(commons.Group, {as: 'group'})
    ###
  create()

  ##relate()
