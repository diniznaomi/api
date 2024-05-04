const {Router} = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');
const UserController = require('./apps/controllers/UserController');
const userSchema = require('./schema/create.user.schema.json');

const routes = new Router();

routes.post('/users', schemaValidator(userSchema), UserController.create);

routes.get('/health', (req, res) => {
    return res.send({message: 'connected sucsaaasesfully'});
});

module.exports = routes;