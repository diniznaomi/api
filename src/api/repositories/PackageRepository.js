const Packages = require('../models/Packages');

class PackageRepository {
    async findById(packageId) {
        return await Packages.findOne({ where: { id: packageId } });
    };

    async listByIds(packageIds) {
      const packageList = await Promise.all(
          packageIds.map(async (packageId) => {
              const foundPackage = await Packages.findOne({ where: { id: packageId } });
              return foundPackage;
          })
      );
  
      return packageList.filter(pkg => pkg !== null);
  };

    async findByName(packageName) {
        return await Packages.findOne({ where: { name: packageName } });
    };


    async createPackage(packageData) {
        return await Packages.create(packageData);
    };

    async updatePackage(packageData, packageId){
        await Packages.update(
          {
            name:packageData.name,
            periodicity:packageData.periodicity,
          },
          {
            where: {
              id: packageId,
            },
          },
        );
    };

    async deletePackage(packageId){
        await Packages.destroy({
          where: {
            id: packageId,
          },
        });
    };
    
};

module.exports = PackageRepository;