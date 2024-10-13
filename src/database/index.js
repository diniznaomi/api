const Sequelize = require('sequelize');
const Clients = require('../api/models/Clients');
const Payments = require('../api/models/Payments');
const Company = require('../api/models/Company');
const Department = require('../api/models/Department');
const Team = require('../api/models/Team');
const User = require('../api/models/User');
const Office = require('../api/models/Office');
const Post = require('../api/models/Post');

const databaseConfig = require('../configs/db');
const Like = require('../api/models/Like');

const models = [
  User, 
  Clients, 
  Payments, 
  Company,
  Post,
  Department,
  Team,
  Office,
  Like
];

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