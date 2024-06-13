const PackageService = require('../services/PackageService');
const packageService = new PackageService();

class PackageController {

    async create(req, res){
        try {
            await packageService.createPackage(req.body);
            return res.status(200).json({message: "package created"})
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async get(req, res){
        try {
            const { id } = req.params;
            const pack = await packageService.getPackageById(id);
            return res.status(200).status(200).json({ pack });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async getListByIds(req, res){
        try {
            const { ids } = req.body;
            const packageList = await packageService.getPackageListByIds(ids);
            return res.status(200).status(200).json({ packageList });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async update(req, res){
        try {
            await packageService.updatePackage(req.body, req.params.id);
            return res.status(200).json({message: "Package updated"})
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    async delete(req, res) {
        try {
          await packageService.deletePackage(req.params.id);
          return res.status(200).json({ message: 'Package deleted' });
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }
    };
};

module.exports = new PackageController();