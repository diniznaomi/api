const { Router } = require('express');
const schemaValidator = require('../api/middlewares/schemaValidator');
const UserController = require('../api/controllers/UserController');
const userSchema = require('../schema/create.user.schema.json');
const AuthenticationMiddleware = require('../api/middlewares/authentication');

const router = Router();

router.post('/', schemaValidator(userSchema), UserController.create);

router.use(AuthenticationMiddleware);

router.put('/', UserController.update);
router.delete('/', UserController.delete);
router.get('/', UserController.getUser);

module.exports = router;