const UserRepository = require('../../repositories/UserRepository');
const bcryptjs = require('bcryptjs');
const { dateConverter } = require('../../../utils/dateConverter');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUser(userId) {
    const userFound = await this.userRepository.findById(userId);

    if (!userFound) {
        throw new Error('User not found');
    }

    const user = {
        id: userFound.id,
        name: userFound.name,
        birth: userFound.birth,
        email: userFound.email,
        company: userFound.company ? userFound.company.name : null,
        role: userFound.role,
        postsCreated: userFound.authorPosts ? userFound.authorPosts.length : 0,
        postsReceived: userFound.recipientPosts ? userFound.recipientPosts.length : 0,
        departments: userFound.departments ? userFound.departments.map(department => department.department_name) : [],
        teams: userFound.teams ? userFound.teams.map(team => team.team_name) : []
    };

    return user;
}


  async createUser(userData) {
    const {departmentIds, teamIds} = userData;
    const { email } = userData;

    const userExists = await this.checkUserExistsByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    if(userData.birth){
      userData.birth = dateConverter(userData.birth);
    }

    return await this.userRepository.createUser(userData, departmentIds, teamIds);
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