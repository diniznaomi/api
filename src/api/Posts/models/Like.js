const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Like extends Model {
    static init(sequelize) {
        super.init(
            {
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
        this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
        this.belongsTo(models.User, { foreignKey: 'liked_by_user_id', as: 'user' });
    }
}

module.exports = Like;
