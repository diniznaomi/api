const Sequelize = require('sequelize');
const Users = require('../api/models/Users');
const Clients = require('../api/models/Clients');
const Packages = require('../api/models/Packages');
const Payments = require('../api/models/Payments');

const models = [Users, Clients, Packages, Payments];
const databaseConfig = require('../configs/db');

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .filter(model => typeof model.associate === 'function')
      .forEach(model => model.associate(this.connection.models));
  }
}

module.exports = new Database();