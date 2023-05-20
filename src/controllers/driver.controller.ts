import { Request, Response } from "express";
import { IDriver } from "../types/models";
import { BadRequestError, NotFoundError } from "../utils/customError";
import driverModel from "../models/driver.model";
import { generateRandNumber, logger } from "../utils/functions";
import { response } from "../utils/response";

export const handleCreateDriver = async (req: Request<{}, {}, IDriver>, res: Response) => {
  if(!req.body.name) throw new BadRequestError("Driver's name is required")
  if(!req.body.licenseNumber) throw new BadRequestError("Driver's license number is required")

  // GENERATE DRIVER'S INDENTICATION NUMBER
  const DIN = generateRandNumber(8)

  logger(DIN)

  const driver = await driverModel.create({
    ...req.body,
    driverIdentificationNumber: DIN
  })

  res.status(201).send(response("Driver created!", driver))
};

export const handleGetAllDrivers = async (req: Request, res: Response) => {
  const drivers = await driverModel.find({})
  res.status(201).send(response("All Drivers!", drivers))
};

export const handleGetOneDriver = async (req: Request<{id: string}>, res: Response) => {
  if(!req.params.id) throw new BadRequestError("Driver's Identification number is required");

  const driver = await driverModel.findOne({ driverIdentificationNumber: req.params.id })
  if(!driver) throw new NotFoundError("Driver not found")

  res.status(201).send(response("Driver!", driver))
};
