import mongoose from "mongoose";

export interface Tracks {
  name: string;
  location: string;
  country: string;
  history: number[];
  is_active: boolean;
}

const tracksSchema = new mongoose.Schema<Tracks>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  history: { type: [Number], required: true },
  is_active: { type: Boolean, required: true },
});

export const tracksModel = mongoose.model<Tracks>("Tracks", tracksSchema);
