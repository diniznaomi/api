const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Office extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        room: Sequelize.STRING,
        floor: Sequelize.STRING,
        seats_number: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
        underscored: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Company, { through: 'Company_Office', foreignKey: 'office_id', as: 'companies' });
  }
}

module.exports = Office;
