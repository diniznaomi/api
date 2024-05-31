const Sequelize = require('sequelize');
const Users = require('../api/models/Users');
const Clients = require('../api/models/Clients');
const Packages = require('../api/models/Packages');

const models = [Users, Clients, Packages];
const databaseConfig = require('../configs/db');

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection));
  }
}

module.exports = new Database();