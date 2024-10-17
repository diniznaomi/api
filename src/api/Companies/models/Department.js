const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Department extends Model {
  static init(sequelize) {
    super.init(
      {
        department_name: Sequelize.STRING,
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
    this.belongsToMany(models.User, { through: 'User_Department', foreignKey: 'department_id', as: 'users' });
  }
}

module.exports = Department;
