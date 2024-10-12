const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const bcryptjs = require('bcryptjs');

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        gender: Sequelize.STRING,
        birth: Sequelize.DATE,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        origin: Sequelize.STRING,
        role: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
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
}

module.exports = Users;