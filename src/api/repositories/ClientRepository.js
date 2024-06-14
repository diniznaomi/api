const Clients = require('../models/Clients');

class ClientRepository {

  async findByEmail(email) {
    return await Clients.findOne({ where: { email } });
  }

  async findById(clientId) {
    return await Clients.findOne({ where: { id: clientId } });
  }

  async findAllByProfessional(professional) {
    return await Clients.findAll({ where: { professional: professional } });
  }

  async createClient(clientData) {
    return await Clients.create(clientData);
  }

  async updateClient(clientData, clientId){
    await Clients.update(
      {
        name: clientData.name,
        phone: clientData.phone,
        minority: clientData.minority,
        birth: clientData.birth,
        guardian_name: clientData.guardian_name,
        guardian_citizen_id: clientData.guardian_citizen_id,
        email: clientData.email,
        package_id: clientData.package_id,
        payment_method_id: clientData.payment_method_id
      },
      {
        where: {
          id: clientId,
        },
      },
    );
  }

  async deleteClient(clientId){
    await Clients.destroy({
      where: {
        id: clientId,
      },
    });
  }
}

module.exports = ClientRepository;