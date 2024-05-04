// const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

class AuthenticationController  {
    async authenticate(req, res) {
        const { email, citizen_id, password } = req.body;
    
        const whereClause = {};

        if (email) {
          whereClause.email = email;
        } else if (citizen_id) {
          whereClause.citizen_id = citizen_id;
        } else {
          return res.status(401).json({ error: 'E-mail or citizen id is required' });
        }
    
        const user = await Users.findOne({
          where: whereClause,
        });
    
        if (!user) {
          return res.status(401).json({ error: 'User not found' });
        }
        
        const validatePassword = await user.checkPassword(password);

        if (!validatePassword) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        // const { id, citizen_id: userName } = user;
    
        // const { iv, content } = encrypt(id);
    
        // const newId = `${iv}:${content}`;
    
        // const token = jwt.sign({ userId: newId }, process.env.HASH_BCRYPT, {
        //   expiresIn: process.env.EXPIRE_IN,
        // });
    
        return res.status(200).json({ user });
      }
}

module.exports = new AuthenticationController();