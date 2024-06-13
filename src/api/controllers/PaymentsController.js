const PaymentService = require('../services/PaymentsService');
const paymentService = new PaymentService();

class PaymentsController {

    async create(req, res) {
        try {
            await paymentService.create(req.body);
            return res.status(200).json({ message: "Payment created" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            await paymentService.delete(req.params.id);
            return res.status(200).json({ message: "Payment deleted" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new PaymentsController();