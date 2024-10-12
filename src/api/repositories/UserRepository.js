const Users = require('../models/Users');

class UserRepository {
  
  async findByEmail(email) {
    return await Users.findOne({ where: { email } });
  }

  async findById(userId){
    return await Users.findOne({
      where: {
        id: userId,
      },
    });
  }

  async createUser(userData) {
    return await Users.create(userData);
  }

  async deleteUser(userId){
    await Users.destroy({
      where: {
        id: userId,
      },
    });
  }

  async updateUser(userData, userId){
    await Users.update(
      {
        name: userData.name, 
        gender: userData.gender, 
        birth: userData.birth, 
        email: userData.email, 
        origin: userData.origin,
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
    await Users.update(
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