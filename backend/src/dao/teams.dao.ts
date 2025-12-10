import { teamsModel } from "../models/teams";


class TeamsDao {
  async getAll() {
    return await teamsModel.find();
  }

  async getById(teamId: string) {
    return await teamsModel.find({teamId: {$regex: `^${teamId}$`, $options: "i"}});
  }
}

export default TeamsDao;





