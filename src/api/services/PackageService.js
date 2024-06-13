const PackageRepository = require('../repositories/PackageRepository');
const { getPeriodicity } = require("../../utils/packageEnum");
const moment = require('moment');
const unidecode = require('unidecode');

class PackageService {
    constructor() {
        this.packageRepository = new PackageRepository();
    }

    async createPackage(packageData) { 
        const { name, periodicityId } = packageData;
        const formattedName = unidecode(name).toUpperCase();

        const packageExists = await this.checkPackageExists(formattedName);

        packageData.name = formattedName;
        packageData.periodicity = getPeriodicity(periodicityId);
    
        if (packageExists) {
          throw new Error('Package already exists');
        }

        return await this.packageRepository.createPackage(packageData);
    };

    async getPackageById(id){
        const foundPackage = await this.packageRepository.findById(id);

        if(!foundPackage){
            throw new Error('Package not found');
        }

        return {
            id: foundPackage.id,
            name: foundPackage.name,
            periodicity: foundPackage.periodicity,
            createdAt: moment.utc(foundPackage.created_at).format('DD-MM-YYYY')
        };

    };

    async getPackageListByIds(ids){
        const list = await this.packageRepository.listByIds(ids);

        if(!list){
            throw new Error('Packages not found');
        }

        const packageList = [];

        list.forEach((item) => {
            const pack = {
                id: item.id,
                name: item.name,
                periodicity: item.periodicity,
                createdAt: moment.utc(item.created_at).format('DD-MM-YYYY')
            }
            
            packageList.push(pack);
        });

        return packageList;
    };

    async updatePackage(packageData, packageId) {
        const packageFound = await this.packageRepository.findById(packageId);

        if (!packageFound) {
            throw new Error('Package not found');
        };

        const { name, periodicityId } = packageData;

        if(name){
            const formattedName =  unidecode(name).toUpperCase();
            packageData.name = formattedName;
        };
        
        if(!(periodicityId == null)){
            packageData.periodicity = getPeriodicity(periodicityId);
        };
        
        await this.packageRepository.updatePackage(packageData, packageId);
      };

      async deletePackage(packageId) {
        const packageFound = await this.packageRepository.findById(packageId);
    
        if (!packageFound) {
          throw new Error('Package not found');
        };
    
        await this.packageRepository.deletePackage(packageId);
      };


    async checkPackageExists(name) {
        const foundPackage = await this.packageRepository.findByName(name);
        return !!foundPackage;
    };
};

module.exports = PackageService;