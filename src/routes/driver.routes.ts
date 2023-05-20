import { Router } from 'express';
import { handleCreateDriver, handleGetAllDrivers, handleGetOneDriver } from '../controllers/driver.controller';


const driverRoute = Router()


// Routes Here

// CREATE DRIVER ROUTE
driverRoute.post("/", handleCreateDriver)

// GET DRIVERS ROUTE
driverRoute.get("/", handleGetAllDrivers)

// GET ONE DRIVER ROUTE
driverRoute.get("/:id", handleGetOneDriver)

export default driverRoute