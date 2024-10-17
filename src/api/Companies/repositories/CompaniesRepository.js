const Company = require("../models/Company");

class CompaniesRepository {
  async findCompanyByNameOrId(identifier) {
    const whereClause = isNaN(identifier) 
        ? { name: identifier } 
        : { id: identifier };   

    return await Company.findOne({ where: whereClause });
  }


    async createCompany(company) {
        return await Company.create(company);
    };

    async updateCompany(company, company_id){
        await Company.update(
          {
            name:company.name,
          },
          {
            where: {
              id: company_id,
            },
          },
        );
    };

    async deleteCompany(company_id){
        await Company.destroy({
          where: {
            id: company_id,
          },
        });
    };
    
};

module.exports = CompaniesRepository;