Sequelize = require('sequelize');

exports.Sequelize = function() {
  return Sequelize
};

exports.sequelize = new Sequelize('CopeAppPrototype', 'postgres', 'postgres', {
  host: 'jeniasrv023.jenia.it',
  dialect: 'postgres',
  port: 5423,
  schema: 'copeapp',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
