const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        message: Sequelize.TEXT,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
        underscored: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });
    this.belongsTo(models.User, { foreignKey: 'to_user_id', as: 'recipient' });
    this.hasMany(models.Like, { foreignKey: 'post_id', as: 'likes' }); 
  }
}

module.exports = Post;
