const Users = require('../models/Users');

class AuthenticationRepository {
    async findByEmail(email) {
        const user = await Users.findOne({ where: { email } });
        return user;
      }
}
module.exports = AuthenticationRepository;