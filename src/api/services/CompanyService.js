const moment = require('moment');
const unidecode = require('unidecode');
const CompanyRepository = require("../repositories/CompanyRepository");

class CompanyService {
    constructor() {
        this.companyRepository = new CompanyRepository;
    }

    async createCompany(company) { 
        const companyExists = await this.checkCompanyExists(company.name);

        if (companyExists) {
            throw new Error('Company already exists');
        };

        return await this.companyRepository.createCompany(company);
    };

    async getCompanyByNameOrId(identifier){
        const company = await this.companyRepository.findCompanyByNameOrId(identifier);

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
        const companyFound = await this.companyRepository.findCompanyByNameOrId(company_id)

        if (!companyFound) {
            throw new Error('Not found');
        };
        
        await this.companyRepository.updateCompany(company, company_id);
      };

      async deleteCompany(company_id) {
        const company = await this.companyRepository.findCompanyByNameOrId(company_id);
    
        if (!company) {
          throw new Error('Company not found');
        };
    
        await this.companyRepository.deleteCompany(company_id);
      };


    async checkCompanyExists(name) {
        const found = await this.companyRepository.findCompanyByNameOrId(name);
        return !!found;
    };
};

module.exports = CompanyService;