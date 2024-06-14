const { Router } = require('express');
const schemaValidator = require('../api/middlewares/schemaValidator');
const clientSchema = require('../schema/create.client.schema.json');
const ClientsController = require('../api/controllers/ClientsController');
const AuthenticationMiddleware = require('../api/middlewares/authentication');

const router = Router();

router.post('/', schemaValidator(clientSchema), ClientsController.create);

router.use(AuthenticationMiddleware);

router.get('/:id', ClientsController.get);

router.get('/all/:professional', ClientsController.getAllByProfessional);

router.put('/:id', ClientsController.update);

router.delete('/:id', ClientsController.delete);

module.exports = router;