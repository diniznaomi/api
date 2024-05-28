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
    }
}
module.exports = new ClientController();