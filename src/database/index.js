const Sequelize = require('sequelize');
const Users = require('../api/models/Users');
const Clients = require('../api/models/Clients');

const models = [Users, Clients];
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