import mongoose from "mongoose";

export interface IDrivers  {
  driverId: string;
  firstName: string;
  lastName: string;
  code: string;
  country: string;
  dob: string;
}

const driversSchema = new mongoose.Schema<IDrivers>({
  driverId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  code: { type: String, required: true },
  country: { type: String, required: true },
  dob: { type: String, required: true },
});

export const driversModel = mongoose.model<IDrivers>("Drivers", driversSchema);
