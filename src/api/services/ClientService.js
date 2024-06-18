const ClientRepository = require("../repositories/ClientRepository");
const PaymentsRepository = require('../repositories/PaymentsRepository');
const PackageRepository = require('../repositories/PackageRepository');
const { dateConverter } = require("../../utils/dateConverter");
const moment = require('moment');

class ClientService{
    constructor() {
        this.clientRepository = new ClientRepository();
        this.paymentRepository = new PaymentsRepository();
        this.packageRepository = new PackageRepository();
    }

    async createClient(clientData) {
        
        const { email } = clientData;
        const clientExists = await this.checkClientExistsByEmail(email);
    
        if (clientExists) {
          throw new Error('Client already exists');
        }
    
        if(clientData.birth){
            clientData.birth = dateConverter(clientData.birth);
        }
    
        return await this.clientRepository.createClient(clientData);
    };

    async findClientsWithExpiringPayments() {
        const clients = await this.clientRepository.findClientsWithExpiringPayments();
        const clientsList = clients.map(client => ({
            name: client.name,
            phone: client.phone,
            email: client.email,
            packageId: client.package_id,
            paymentId: client.payment_id,
            activeReminder: client.active_reminder,
            packageName: client.package.name,
            paymentDay: client.payment.payment_day,
            expiration: client.payment.expiration,
            value: client.payment.value
        }));
    
        return clientsList;
    };

    async getClientById(id){
        console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
        const client = await this.clientRepository.findById(id);

        if(!client){
            throw new Error('Client not found');
        }

        return {
            name: client.name,
            citizenId: client.citizen_id,
            phone: client.phone,
            minority: client.minority,
            birth: moment.utc(client.birth).format('DD-MM-YYYY'),
            guardian: {
                name: client.guardian_name,
                citizenId: client.guardian_citizen_id,
            },
            email: client.email,
            professional: client.professional,
            packageId: client.package_id,
            paymentId: client.payment_id,
            activeReminder: client.active_reminder
        }

    };

    async getClientsByProfessional(professional){
        const clients = await this.clientRepository.findAllByProfessional(professional);

        if(!clients){
            throw new Error('Client not found');
        }

        const clientsList = [];

        clients.forEach((client) => {
            const foundClient = {
                name: client.name,
                citizenId: client.citizen_id,
                phone: client.phone,
                minority: client.minority,
                birth: moment.utc(client.birth).format('DD-MM-YYYY'),
                guardian: {
                    name: client.guardian_name,
                    citizenId: client.guardian_citizen_id,
                },
                email: client.email,
                professional: client.professional,
                packageId: client.package_id,
                paymentId: client.payment_id,
                activeReminder: client.active_reminder
            }
            clientsList.push(foundClient);
        });
        
        return clientsList;
    };

    async updateClient(clientData, clientId) {
        const clientFound = await this.clientRepository.findById(clientId);
    
        if (!clientFound) {
          throw new Error('Client not found');
        };
        
        this.clientRepository.updateClient(clientData, clientId);
      };

      async deleteClient(clientId) {
        const clientFound = await this.clientRepository.findById(clientId);
    
        if (!clientFound) {
          throw new Error('Client not found');
        };
    
        await this.clientRepository.deleteClient(clientId);
      };


    async checkClientExistsByEmail(email) {
        const client = await this.clientRepository.findByEmail(email);
        return !!client;
    };

};

module.exports = ClientService;