const { Router } = require('express');
const schemaValidator = require('../api/middlewares/schemaValidator');
const paymentSchema = require('../schema/payment.schema.json');
const PaymentsController = require('../api/controllers/PaymentsController');
const AuthenticationMiddleware = require('../api/middlewares/authentication');

const router = Router();

router.use(AuthenticationMiddleware);

router.post('/', schemaValidator(paymentSchema), PaymentsController.create);

router.delete('/:id', PaymentsController.delete);

module.exports = router;