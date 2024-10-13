const User = require("../models/User");

class UserRepository {
  
  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findById(userId){
    return await User.findOne({
      where: {
        id: userId,
      },
    });
  }

  async createUser(userData) {
    return await User.create(userData);
  }

  async deleteUser(userId){
    await User.destroy({
      where: {
        id: userId,
      },
    });
  }

  async updateUser(userData, userId){
    await User.update(
      {
        name: userData.name, 
        gender: userData.gender, 
        birth: userData.birth, 
        email: userData.email, 
        company_id: userData.company_id,
        role: userData.role,
      },
      {
        where: {
          id: userId,
        },
      },
    );
  }

  async updateUserPassword(encryptedPassword, userId){
    await User.update(
      {
        password_hash: encryptedPassword,
      },
      {
        where: {
          id: userId,
        },
      },
    )
  }
}

module.exports = UserRepository;