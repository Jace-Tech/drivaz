import mongoose from 'mongoose';
import { IDriver } from '../types/models';


const driverSchema = new mongoose.Schema<IDriver>({
  driverIdentificationNumber: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: String,
  licenseNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  phone: String,
  gender: String,
}, { timestamps: true });

export default mongoose.model('driver', driverSchema)