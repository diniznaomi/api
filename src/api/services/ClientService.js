const ClientRepository = require("../repositories/ClientRepository")
const { dateConverter } = require("../../utils/dateConverter");
const moment = require('moment');

class ClientService{
    constructor() {
        this.clientRepository = new ClientRepository();
    }

    async createClient(clientData) {
        
        const { email } = clientData;
        const clientExists = await this.checkClientExistsByEmail(email);
    
        if (clientExists) {
          throw new Error('Client already exists');
        }
    
        if(clientData.birth){
            clientData.birth = dateConverter(clientData.birth);
            console.log(clientData.birth)
        }
    
        const client = await this.clientRepository.createClient(clientData);
        return client;
    }

    async getClientById(id){
        const client = await this.clientRepository.findById(id);

        if(!client){
            throw new Error('Client not found');
        }

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
            professionalId: client.professional_id,
            packageId: client.package_id,
            paymentMethodId: client.payment_method_id
        }

        return foundClient;
    }

    async getClientsByProfessionalId(professionalId){
        const clients = await this.clientRepository.findAllByProfessionalId(professionalId);

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
                professionalId: client.professional_id,
                packageId: client.package_id,
                paymentMethodId: client.payment_method_id
            }
            clientsList.push(foundClient);
        });
        
        return clientsList;
    }

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