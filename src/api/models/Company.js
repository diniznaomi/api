const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
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
    this.hasMany(models.User, { foreignKey: 'company_id', as: 'employees' });
    this.belongsToMany(models.Office, { through: 'Company_Office', foreignKey: 'company_id', as: 'offices' });
  }
}

module.exports = Company;
