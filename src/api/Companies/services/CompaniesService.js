const moment = require('moment');
const CompaniesRepository = require("../repositories/CompaniesRepository");

class CompaniesService {
    constructor() {
        this.companiesRepository = new CompaniesRepository;
    }

    async createCompany(company) { 
        const companyExists = await this.checkCompanyExists(company.name);

        if (companyExists) {
            throw new Error('Company already exists');
        };

        return await this.companiesRepository.createCompany(company);
    };

    async getCompanyByNameOrId(identifier){
        const company = await this.companiesRepository.findCompanyByNameOrId(identifier);

        if(!company){
            return [];
        }

        const response = {
            id: company.id,
            name: company.name,
            createdAt: moment.utc(company.created_at).format('DD-MM-YYYY')
        };

        return response;

    };

    async updateCompany(company, company_id) {
        const companyFound = await this.companiesRepository.findCompanyByNameOrId(company_id)

        if (!companyFound) {
            throw new Error('Not found');
        };
        
        await this.companiesRepository.updateCompany(company, company_id);
      };

      async deleteCompany(company_id) {
        const company = await this.companiesRepository.findCompanyByNameOrId(company_id);
    
        if (!company) {
          throw new Error('Company not found');
        };
    
        await this.companiesRepository.deleteCompany(company_id);
      };


    async checkCompanyExists(name) {
        const found = await this.companiesRepository.findCompanyByNameOrId(name);
        return !!found;
    };
};

module.exports = CompaniesService;