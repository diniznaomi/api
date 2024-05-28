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

    async checkClientExistsByEmail(email) {
        const client = await this.clientRepository.findByEmail(email);
        console.log(email)
        return !!client;
      };
};

module.exports = ClientService;