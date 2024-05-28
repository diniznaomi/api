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
        guardian_name: Sequelize.STRING,
        guardian_citizen_id: Sequelize.STRING,
        guardian_phone: Sequelize.STRING,
        email: Sequelize.STRING,
        professional_id: Sequelize.INTEGER,
        package_id: Sequelize.INTEGER,
        payment_method_id: Sequelize.INTEGER,
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