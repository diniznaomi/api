const CompanyService = require('../services/CompanyService');
const companyService = new CompanyService();

class CompanyController {

    async create(req, res){
        try {
            await companyService.createCompany(req.body);
            return res.status(200).json({message: "Company created"})
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async get(req, res){
        try {
            const { id } = req.params;
            const company = await companyService.getCompanyByNameOrId(id);
            return res.status(200).status(200).json({ company });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async update(req, res){
        try {
            await companyService.updateCompany(req.body, req.params.id);
            return res.status(200).json({message: "Company updated"})
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async delete(req, res) {
        try {
          await companyService.deleteCompany(req.params.id);
          return res.status(200).json({ message: 'Company deleted' });
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }
    };
};

module.exports = new CompanyController();