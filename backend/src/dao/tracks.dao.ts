import { tracksModel } from "../models/tracks";

class TracksDao {
  async getAll() {
    return await tracksModel.find();
  }

  async getByName(trackName: string) {
    return await tracksModel.find({
      name: { $regex: `^${trackName}$`, $options: "i" },
    });
  }
  
  async getByCountry(country: string) {
    return await tracksModel.find({ country: { $regex: `^${country}$`, $options: "i" } });
  }

  async getStatus(is_active: boolean) {
    return await tracksModel.find({ is_active });
  }
}

export default TracksDao;
