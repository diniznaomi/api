const Users = require('../models/Users');

class UserRepository {
  async findByEmail(email) {
    const user = await Users.findOne({ where: { email } });
    return user;
  }

  async findById(userId){
    const user = await Users.findOne({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async createUser(userData) {
    const user = await Users.create(userData);
    return user;
  }

  async deleteUser(userId){
    await Users.destroy({
      where: {
        id: userId,
      },
    });
  }

  async updateUser(userData, userId){
    console.log(userData, userId);
    await Users.update(
      {
        first_name: userData.first_name, 
        last_name: userData.last_name, 
        gender: userData.gender, 
        birth: userData.birth, 
        email: userData.email, 
        work_email: userData.work_email, 
        phone: userData.phone, 
        work_phone: userData.work_phone, 
        citizen_id: userData.citizen_id,  
        professional_id: userData.professional_id,
        business: userData.business,
        origin: userData.origin,
        pix: userData.pix 
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