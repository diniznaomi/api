const { Router } = require('express');
const schemaValidator = require('../api/middlewares/schemaValidator');
const UserController = require('../api/controllers/UserController');
const userSchema = require('../schema/create.user.schema.json');
const AuthenticationMiddleware = require('../api/middlewares/authentication');

const router = Router();

router.post('/', schemaValidator(userSchema), UserController.create);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);
router.use(AuthenticationMiddleware);

module.exports = router;