const UserService = require('../services/UserService');
const userService = new UserService();

class UserController {

  async create(req, res) {
    try {
      await userService.createUser(req.body);
      return res.status(200).json({ message: 'User created' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      await userService.updateUser(req.body, req.userId);
      return res.status(200).json({ message: 'User updated' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await userService.deleteUser(req.userId);
      return res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getUser(req, res){
    try {
      const user = await userService.getUser(req.userId);
      return res.status(200).status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  
}
module.exports = new UserController();