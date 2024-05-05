const {Router} = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');

const UserController = require('./apps/controllers/UserController');
const AuthenticationController = require('./apps/controllers/AuthenticationController');

const userSchema = require('./schema/create.user.schema.json');
const authSchema = require('./schema/auth.schema.json');

const routes = new Router();

routes.post('/users', schemaValidator(userSchema), UserController.create);

routes.post('/auth', schemaValidator(authSchema), AuthenticationController.authenticate);

routes.get('/health', (req, res) => {
    return res.send({message: 'connected sucsaaasesfully'});
});

module.exports = routes;