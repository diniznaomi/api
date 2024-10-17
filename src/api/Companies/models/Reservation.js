const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Reservation extends Model {
  static init(sequelize) {
    super.init(
      {
        reservation_date: Sequelize.DATEONLY,
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
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Office, { foreignKey: 'office_id', as: 'office' });
  }
}

module.exports = Reservation;
