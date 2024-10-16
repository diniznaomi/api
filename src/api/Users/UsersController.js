const UsersService = require('./services/UsersService');
const usersService = new UsersService();

class UsersController {

  async create(req, res) {
    try {
      await usersService.createUser(req.body);
      return res.status(200).json({ message: 'User created' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const userId = parseInt(req.params.id)
      await usersService.updateUser(req.body, userId);
      return res.status(200).json({ message: 'User updated' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const userId = parseInt(req.params.id)
      await usersService.deleteUser(userId);
      return res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getUser(req, res){
    try {
      const userId = parseInt(req.params.id)
      const user = await usersService.getUser(userId);
      return res.status(200).status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  
}
module.exports = new UsersController();