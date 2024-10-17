const AuthenticationService = require('./services/AuthenticationService');
const authenticationService = new AuthenticationService();

class AuthenticationController  {
  async authenticate(req, res) {
      try {
        const data = await authenticationService.authenticate(req.body);
        return res.status(200).json({ data });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }      
    }
}

module.exports = new AuthenticationController();