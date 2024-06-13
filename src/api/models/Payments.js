const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Payments extends Model {
  static init(sequelize) {
    super.init(
      {
        package_id: Sequelize.INTEGER,
        value: Sequelize.STRING,
        payment_day: Sequelize.DATE,
        expiration: Sequelize.DATE,
        status: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

module.exports = Payments;