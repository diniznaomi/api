const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Clients extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        citizen_id: Sequelize.STRING,
        phone: Sequelize.STRING,
        minority: Sequelize.BOOLEAN,
        birth: Sequelize.DATE,
        guardian_name: Sequelize.STRING,
        guardian_citizen_id: Sequelize.STRING,
        email: Sequelize.STRING,
        professional: Sequelize.INTEGER,
        package_id: Sequelize.INTEGER,
        payment_id: Sequelize.INTEGER,
        active_reminder: Sequelize.BOOLEAN,
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

module.exports = Clients;