const PaymentsRepository = require('../repositories/PaymentsRepository');
const { dateConverter } = require("../../utils/dateConverter");

class PaymentsService {
    constructor() {
        this.paymentsRepository = new PaymentsRepository();
    }

    async create(paymentData) { 
        if(paymentData.expiration){
            paymentData.expiration = dateConverter(paymentData.expiration);
        }
        if(paymentData.payment_day){
            paymentData.payment_day = dateConverter(paymentData.payment_day);
        }
        
        return await this.paymentsRepository.createPayment(paymentData);
    }

    async changeStatusToLate(clientId) {
        await this.paymentsRepository.changeStatusToLate(clientId);
    }

    async delete(paymentId) {
        return await this.paymentsRepository.deletePayment(paymentId);
    }
}

module.exports = PaymentsService;