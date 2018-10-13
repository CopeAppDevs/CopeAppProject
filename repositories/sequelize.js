const Sequelize = require('sequelize');
exports.sequelize = new Sequelize('CopeAppPrototype', 'CopeApp', 'CopeApp', {
  host: 'jeniasrv023.jenia.it',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
