const Clients = require('../models/Clients');

class ClientRepository {

  async findByEmail(email) {
    const client = await Clients.findOne({ where: { email } });
    return client;
  }

  async findById(clientId) {
    const client = await Clients.findOne({ where: { id: clientId } });
    return client;
  }

  async createClient(clientData) {
    const client = await Clients.create(clientData);
    return client;
  }

  // async updateClient(clientData, clientId){
  //   console.log(userData, userId);
  //   await Users.update(
  //     {
  //       first_name: userData.first_name, 
  //       last_name: userData.last_name, 
  //       gender: userData.gender, 
  //       birth: userData.birth, 
  //       email: userData.email, 
  //       work_email: userData.work_email, 
  //       phone: userData.phone, 
  //       work_phone: userData.work_phone, 
  //       citizen_id: userData.citizen_id,  
  //       professional_id: userData.professional_id,
  //       business: userData.business,
  //       origin: userData.origin,
  //       pix: userData.pix 
  //     },
  //     {
  //       where: {
  //         id: userId,
  //       },
  //     },
  //   );
  // }
}

module.exports = ClientRepository;