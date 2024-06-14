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

  static associate(models) {
    this.hasMany(models.Clients, { foreignKey: 'package_id', as: 'clients' });
  }
}

module.exports = Packages;