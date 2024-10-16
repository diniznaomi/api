const { Router } = require('express');
const schemaValidator = require('../../api/middlewares/schemaValidator');
const AuthenticationController = require('../../api/Auth/AuthenticationController');
const authSchema = require('../../api/Auth/schema/auth.schema.json');

const router = Router();

router.post('/', schemaValidator(authSchema), AuthenticationController.authenticate);

module.exports = router;