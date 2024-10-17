const Sequelize = require('sequelize');
const Company = require('../api/Companies/models/Company');
const Department = require('../api/Companies/models/Department');
const Team = require('../api/Companies/models/Team');
const User = require('../api/Users/models/User');
const Office = require('../api/Companies/models/Office');
const Post = require('../api/Posts/models/Post');
const Like = require('../api/Posts/models/Like');
const Reservation = require('../api/Companies/models/Reservation');

const databaseConfig = require('./configs/db');

const models = [
  User, 
  Company,
  Post,
  Department,
  Team,
  Office,
  Like,
  Reservation
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