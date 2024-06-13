const { Router } = require('express');
const schemaValidator = require('../api/middlewares/schemaValidator');
const packageSchema = require('../schema/create.package.schema.json');
const PackageController = require('../api/controllers/PackageController');
const AuthenticationMiddleware = require('../api/middlewares/authentication');

const router = Router();

router.use(AuthenticationMiddleware);

router.post('/', schemaValidator(packageSchema), PackageController.create);

router.get('/:id', PackageController.get);

router.get('/', PackageController.getListByIds);

router.put('/:id', PackageController.update);

router.delete('/:id', PackageController.delete);

module.exports = router;