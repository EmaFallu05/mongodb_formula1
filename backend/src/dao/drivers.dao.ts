import { driversModel } from "../models/drivers";

class DriversDao {
  async getAll() {
    return await driversModel.find();
  }

  async getById(driverId: string) {
    return await driversModel.find({driverId: {$regex: `^${driverId}$`, $options: "i"}});
  }

  async getByCountry(country: string) {
    return await driversModel.find({ country: {$regex: `^${country}$`, $options: "i"}});
  }
}

export default DriversDao;
