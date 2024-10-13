const { Router } = require('express');
const schemaValidator = require('../api/middlewares/schemaValidator');
const companySchema = require('../schema/create.company.schema.json');
const AuthenticationMiddleware = require('../api/middlewares/authentication');
const CompanyController = require('../api/controllers/CompanyController');

const router = Router();

router.use(AuthenticationMiddleware);

router.post('/', schemaValidator(companySchema), CompanyController.create);

router.get('/:id', CompanyController.get);

router.put('/:id', CompanyController.update);

router.delete('/:id', CompanyController.delete);

module.exports = router;