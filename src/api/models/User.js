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
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
    this.belongsToMany(models.Department, { through: 'user_department', foreignKey: 'user_id', as: 'departments' }); // Ajustar para user_department
    this.belongsToMany(models.Team, { through: 'user_team', foreignKey: 'user_id', as: 'teams' }); // Ajustar para user_team
    this.hasMany(models.Like, { foreignKey: 'liked_by_user_id', as: 'likes' });
    this.hasMany(models.Post, { foreignKey: 'user_id', as: 'authorPosts' });
    this.hasMany(models.Post, { foreignKey: 'to_user_id', as: 'recipientPosts' });
  }
}

module.exports = User;