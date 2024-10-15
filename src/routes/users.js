const { Router } = require('express');
const schemaValidator = require('../api/middlewares/schemaValidator');
const UsersController = require('../api/Users/UsersController');
const userSchema = require('../api/Users/schema/create.user.schema.json');
const AuthenticationMiddleware = require('../api/middlewares/authentication');

const router = Router();

router.post('/', schemaValidator(userSchema), UsersController.create);
router.get('/:id', UsersController.getUser);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.delete);
router.use(AuthenticationMiddleware);

module.exports = router;