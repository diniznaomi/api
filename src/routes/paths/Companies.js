const { Router } = require('express');
const schemaValidator = require('../../api/middlewares/schemaValidator');
const companySchema = require('../../api/Companies/schema/create.company.schema.json');
const AuthenticationMiddleware = require('../../api/middlewares/authentication');
const CompaniesController = require('../../api/Companies/CompaniesController');

const router = Router();

router.use(AuthenticationMiddleware);

router.post('/', schemaValidator(companySchema), CompaniesController.create);

router.get('/:id', CompaniesController.get);

router.put('/:id', CompaniesController.update);

router.delete('/:id', CompaniesController.delete);

module.exports = router;