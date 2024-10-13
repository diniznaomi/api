const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const bcryptjs = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        role: Sequelize.STRING,
        birth: Sequelize.DATE,
        company_id: Sequelize.INTEGER,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
        underscored: true,
      },
    );

    this.addHook('beforeSave', async (user) => {
      if(user.password){
        user.password_hash = await bcryptjs.hash(user.password, 8)
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
    this.belongsToMany(models.Department, { through: 'User_Department', foreignKey: 'user_id', as: 'departments' });
    this.belongsToMany(models.Team, { through: 'User_Team', foreignKey: 'user_id', as: 'teams' });
    this.hasMany(models.Like, { foreignKey: 'liked_by_user_id', as: 'likes' });
  }
}

module.exports = User;