const Payments = require('../models/Payments');

class PaymentsRepository {
    
    async findById(paymentId) {
        return await Payments.findOne({ where: { id: paymentId } });
    };

    async createPayment(paymentData) {
        return await Payments.create(paymentData);
    };

    async deletePayment(paymentId){
        await Payments.destroy({
          where: {
            id: paymentId,
          },
        });
    };
    
};

module.exports = PaymentsRepository;