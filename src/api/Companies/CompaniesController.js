const CompaniesService = require("./services/CompaniesService");
const ReservationService = require('./services/ReservationsService');
const reservationService = new ReservationService();
const companiesService = new CompaniesService();

class CompaniesController {

    async create(req, res){
        try {
            await companiesService.createCompany(req.body);
            return res.status(200).json({message: "Company created"})
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async get(req, res){
        try {
            const { id } = req.params;
            const company = await companiesService.getCompanyByNameOrId(id);
            return res.status(200).status(200).json({ company });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async update(req, res){
        try {
            await companiesService.updateCompany(req.body, req.params.id);
            return res.status(200).json({message: "Company updated"})
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async delete(req, res) {
        try {
          await companiesService.deleteCompany(req.params.id);
          return res.status(200).json({ message: 'Company deleted' });
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }
    };

    async createReservation(req, res) {
        try {
          const { officeId, reservationDate, userId } = req.body;
          const reservation = await reservationService.createReservation(userId, officeId, reservationDate);
          return res.status(201).json(reservation);
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }
      }
};

module.exports = new CompaniesController();