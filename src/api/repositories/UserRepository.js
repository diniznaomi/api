const Company = require("../models/Company");
const Department = require("../models/Department");
const Post = require("../models/Post");
const Team = require("../models/Team");
const User = require("../models/User");

class UserRepository {
  
  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findById(userId) {
    return await User.findOne({
        where: { id: userId },
        include: [
            { model: Company, as: 'company' },
            { model: Post, as: 'authorPosts' },
            { model: Post, as: 'recipientPosts' },
            { model: Department, as: 'departments' },
            { model: Team, as: 'teams' }
        ],
    });
}

async createUser(userData, departmentIds, teamIds) {
  const user = await User.create(userData);
  
  if (departmentIds && departmentIds.length > 0) {
    await user.setDepartments(departmentIds); 
  }
  
  if (teamIds && teamIds.length > 0) {
    await user.setTeams(teamIds); 
  }

  return user;
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