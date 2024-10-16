const AuthenticationRepository = require('../repositories/AuthenticationRepository');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { encrypt } = require('../../../utils/crypt');

class AuthenticationService {
    constructor() {
        this.authenticationRepository = new AuthenticationRepository();
      }

    async authenticate(data) {
        const { email, password } = data;

        if (!email) {
          throw new Error('E-mail is required');
        };

        const user = await this.authenticationRepository.findByEmail(email);
        
        if (!user) {
        throw new Error('User not found');
        };

        const validatePassword = await user.checkPassword(password);

        if (!validatePassword) {
            throw new Error('Invalid credentials');
        };

        const { id, email: userEmail } = user;
    
        const { iv, content } = encrypt(id);
    
        const newId = `${iv}:${content}`;
    
        const token = jwt.sign({ userId: newId }, process.env.HASH_BCRYPT, {
           expiresIn: process.env.EXPIRE_IN,
        });

        return ({ user: {id, userEmail}, token });
    };
}
module.exports = AuthenticationService;