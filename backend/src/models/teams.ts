import mongoose from "mongoose";

export interface ITeams {
  teamId: string;
  name: string;
  activeUntil: number | null;
}

const teamsSchema = new mongoose.Schema<ITeams>({
  teamId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  activeUntil: { type: Number, required: false },
});

export const teamsModel = mongoose.model<ITeams>("Teams", teamsSchema);
