const ClientService = require("../services/ClientService");
const clientService = new ClientService();

class ClientController{

    async create(req, res){
        try {
            await clientService.createClient(req.body);
            return res.status(200).json({message: "client created"})
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async get(req, res){
        try {
            const { id } = req.params;
            const client = await clientService.getClientById(id);
            return res.status(200).status(200).json({ client });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async getAllByProfessionalId(req, res){
        try {
            const { professionalId } = req.params;
            const clients = await clientService.getClientsByProfessionalId(professionalId);
            return res.status(200).status(200).json({ clients });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async update(req, res){
        try {
            await clientService.updateClient(req.body, req.params.id);
            return res.status(200).json({message: "client updated"})
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async delete(req, res) {
        try {
          await clientService.deleteClient(req.params.id);
          return res.status(200).json({ message: 'Client deleted' });
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }
    };
}
module.exports = new ClientController();