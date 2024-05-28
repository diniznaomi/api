const Clients = require('../models/Clients');

class ClientRepository {

  async findByEmail(email) {
    const client = await Clients.findOne({ where: { email } });
    console.log("chega1")
    return client;
  }

  async createClient(clientData) {
    const client = await Clients.create(clientData);
    console.log("chega2")
    return client;
  }
}

module.exports = ClientRepository;