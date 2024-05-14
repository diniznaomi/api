const { Router } = require('express');
const schemaValidator = require('../api/middlewares/schemaValidator');
const AuthenticationController = require('../api/controllers/AuthenticationController');
const authSchema = require('../schema/auth.schema.json');

const router = Router();

router.post('/', schemaValidator(authSchema), AuthenticationController.authenticate);

module.exports = router;