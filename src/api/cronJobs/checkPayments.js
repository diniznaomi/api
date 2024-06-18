const ClientService = require("../services/ClientService");
const clientService = new ClientService();
const EmailService = require("../services/EmailService");
const emailService = new EmailService();
const cron = require('node-cron');
const moment = require('moment');

const sendEmail = async (clientData) => {
    const emailData = {
        to: clientData.email,
        subject: 'Pagamento próximo do vencimento',
        text: `Olá ${clientData.name}, seu pagamento no valor de ${clientData.value} está próximo da data de vencimento. Por favor, faça o pagamento.`
    };

    try {
        await emailService.sendEmail(emailData);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
}

const sendWhatsappMessage = async (clientData) => { 
    //TODO: Implementar a lógica para enviar a mensagem via WhatsApp
}

const changeStatusToLate = async (client) => {
    // Lógica para alterar o status do cliente para "L"
}

// Cron job para executar todos os dias às 10h
cron.schedule('* 10 * * *', async () => {
    try {
        const clients = await clientService.findClientsWithExpiringPayments();
        const currentDate = moment();

        clients.forEach(async (client) => {
            let expiration = moment(client.expiration);
            let diffDays = expiration.diff(currentDate, 'days');

            if (diffDays == 2) {
                await sendEmail(client);
            }

            if (diffDays < 0) {
                await changeStatusToLate(client); 
            }
        });
    } catch (error) {
        throw new Error('Error executing cron job:', error);
    }
});