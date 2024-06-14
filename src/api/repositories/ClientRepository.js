const Clients = require('../models/Clients');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const Payments = require('../models/Payments');

class ClientRepository {

  async findClientsWithExpiringPayments() {
    return await Clients.findAll({
        include: [{
            model: Payments,
            as: 'payment',
            where: {
                expiration: {
                    [Op.lte]: moment().add(3, 'days').toDate()
                }
            }
        }]
    });
  }

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
        payment_id: clientData.payment_id,
        active_reminder: clientData.active_reminder
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