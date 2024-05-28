const ClientRepository = require("../repositories/ClientRepository")
const { dateConverter } = require("../../utils/dateConverter");

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

    async checkClientExistsByEmail(email) {
        const client = await this.clientRepository.findByEmail(email);
        return !!client;
    };

};

module.exports = ClientService;