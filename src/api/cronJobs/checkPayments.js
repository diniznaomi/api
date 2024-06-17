const ClientService = require("../services/ClientService");
const clientService = new ClientService();
const EmailService = require("../services/EmailService");
const emailService = new EmailService();
const cron = require('node-cron');

const accountSid = 'your_twilio_account_sid';
const authToken = 'your_twilio_auth_token';
const client = twilio(accountSid, authToken);


const sendWhatsappMessage = async (clientData) => { //TODO: Implementar a lógica para enviar a mensagem via WhatsApp
    client.messages
    .create({
        body: `Olá ${clientData.name}, seu pagamento está próximo da data de vencimento. Por favor, faça o pagamento.`,
        from: 'whatsapp:your_twilio_number',
        to: `whatsapp:${clientData.phone}`
    })
    .then(message => console.log(message.sid));
}

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

const changeStatusToLate = async (client) => {
    // Lógica para alterar o status do cliente para "L"
}

cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
});


// Cron job para executar todos os dias às 21:03
cron.schedule('* * * * *', async () => {
    console.log('oi')
    try {
        const clients = await clientService.findClientsWithExpiringPayments();
        console.log(clients);

        const currentDate = new Date();

        for (const client of clients) {
            const expirationDate = new Date(client.expiration);
            const diffDays = Math.ceil((expirationDate - currentDate) / (1000 * 60 * 60 * 24));

            if (diffDays < 3) {
                sendEmail(client);
            }

            if (diffDays < 0) {
                changeStatusToLate(client); 
            }
        }
    } catch (error) {
        console.error('Erro ao executar o cron job:', error);
    }
}, {
    timezone: "America/Sao_Paulo"
});