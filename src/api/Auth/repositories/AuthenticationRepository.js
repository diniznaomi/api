const Users = require('../../Users/models/User');

class AuthenticationRepository {
    async findByEmail(email) {
        return await Users.findOne({ where: { email } });
      }
}
module.exports = AuthenticationRepository;