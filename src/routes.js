const {Router} = require('express');
const schemaValidator = require('./api/middlewares/schemaValidator');

const UserController = require('./api/controllers/UserController');
const AuthenticationController = require('./api/controllers/AuthenticationController');

const AuthenticationMiddleware = require('./api/middlewares/authentication');

const userSchema = require('./schema/create.user.schema.json');
const authSchema = require('./schema/auth.schema.json');

const routes = new Router();

routes.post('/user', schemaValidator(userSchema), UserController.create);

routes.post('/auth', schemaValidator(authSchema), AuthenticationController.authenticate);

routes.use(AuthenticationMiddleware);

routes.put('/user', UserController.update);

routes.delete('/user', UserController.delete);

routes.get('/health', (req, res) => {
    return res.send({message: 'connected sucsaaasesfully'});
});

module.exports = routes;