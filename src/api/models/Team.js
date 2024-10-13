const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Team extends Model {
  static init(sequelize) {
    super.init(
      {
        team_name: Sequelize.STRING,
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
    this.belongsTo(models.Department, { foreignKey: 'department_id', as: 'department' });
    this.belongsToMany(models.User, { through: 'User_Team', foreignKey: 'team_id', as: 'users' });
  }
}

module.exports = Team;
