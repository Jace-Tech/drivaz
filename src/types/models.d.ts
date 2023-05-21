import mongoose from "mongoose";

interface IDriver {
  driverIdentificationNumber: string;
  name: string;
  image: string;
  coverImage: string;
  licenseNumber: string;
  address: string;
  phone: string;
  gender: string;
}