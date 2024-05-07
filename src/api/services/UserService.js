const UserRepository = require('../repositories/UserRepository');
const bcryptjs = require('bcryptjs');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData) {
    const { email } = userData;

    const userExists = await this.checkUserExistsByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const user = await this.userRepository.createUser(userData);
    return user;
  }

  async updateUser(userData, userId) {
    const userFound = await this.userRepository.findById(userId);

    if (!userFound) {
      throw new Error('User not found');
    };

    if(userData.password && userData.new_password && userData.confirm_new_password){
      const passwordsCheck = this.checkPasswords(userData.password, userData.new_password, userData.confirm_new_password, userFound);
      
      if(passwordsCheck){
        const encryptedNewPassword = await bcryptjs.hash(userData.new_password, 8);
        console.log(encryptedNewPassword);
        this.userRepository.updateUserPassword(encryptedNewPassword, userId);
      }
    };
    
    this.userRepository.updateUser(userData, userId);
  };

  async checkUserExistsByEmail(email) {
    const user = await this.userRepository.findByEmail(email);
    return !!user;
  };

  async findUserByEmail(email) {
    const user = await this.userRepository.findByEmail(email)
    return user;
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