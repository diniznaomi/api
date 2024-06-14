const UserRepository = require('../repositories/UserRepository');
const bcryptjs = require('bcryptjs');
const { dateConverter } = require('../../utils/dateConverter');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUser(userId){
    const userFound = await this.userRepository.findById(userId);

    if(!userFound){
      throw new Error('User not found');
    }

    return user = { 
      id: userFound.id, 
      first_name: userFound.first_name, 
      last_name: userFound.last_name, 
      gender: userFound.gender, 
      birth: userFound.birth, 
      email: userFound.email, 
      work_email: userFound.work_email, 
      phone: userFound.phone, 
      work_phone: userFound.work_phone, 
      citizen_id: userFound.citizen_id,  
      professional_id: userFound.professional_id,
      business: userFound.business,
      origin: userFound.origin,
      pix: userFound.pix,
      active_reminder: userFound.active_reminder
    };

  };

  async createUser(userData) {
    const { email } = userData;

    const userExists = await this.checkUserExistsByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    if(userData.birth){
      userData.birth = dateConverter(userData.birth);
    }

    return await this.userRepository.createUser(userData);
  }

  async deleteUser(userId) {
    const userFound = await this.userRepository.findById(userId);

    if (!userFound) {
      throw new Error('User not found');
    };

    await this.userRepository.deleteUser(userId);
  };

  async updateUser(userData, userId) {
    const userFound = await this.userRepository.findById(userId);

    if (!userFound) {
      throw new Error('User not found');
    };

    if(userData.password && userData.new_password && userData.confirm_new_password){
      const passwordsCheck = this.checkPasswords(userData.password, userData.new_password, userData.confirm_new_password, userFound);
      
      if(passwordsCheck){
        const encryptedNewPassword = await bcryptjs.hash(userData.new_password, 8);

        this.userRepository.updateUserPassword(encryptedNewPassword, userId);
      }
    };

    userData.birth = dateConverter(userData.birth);
    
    await this.userRepository.updateUser(userData, userId);
  };

  async checkUserExistsByEmail(email) {
    const user = await this.userRepository.findByEmail(email);
    return !!user;
  };

  async findUserByEmail(email) {
    return await this.userRepository.findByEmail(email)
  };

  async checkPasswords(password, newPassword, confirmNewPassword, userFound){
    if (password) {
      if (!await userFound.checkPassword(password)) {
        throw new Error('Old password does not match');
      };

      if (newPassword === '' || confirmNewPassword === '') {
        throw new Error('new_password and confirm_new_password attributes are required');
      };

      if (newPassword !== confirmNewPassword) {
        throw new Error('New password and confirm new password does not match');
      };

      return true;
    }

    return null;
  };

};

module.exports = UserService;