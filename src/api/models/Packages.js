const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Packages extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        periodicity: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

module.exports = Packages;