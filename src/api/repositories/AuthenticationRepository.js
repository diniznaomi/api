const Users = require('../models/Users');

class AuthenticationRepository {
    async findByEmail(email) {
        return await Users.findOne({ where: { email } });
      }
}
module.exports = AuthenticationRepository;