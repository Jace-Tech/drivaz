import { Router } from 'express';
import { handleCreateDriver, handleDeleteOneDriver, handleGetAllDrivers, handleGetOneDriver, handleUpdateOneDriver } from '../controllers/driver.controller';


const driverRoute = Router()


// Routes Here

// CREATE DRIVER ROUTE
driverRoute.post("/", handleCreateDriver)

// GET DRIVERS ROUTE
driverRoute.get("/", handleGetAllDrivers)

// GET ONE DRIVER ROUTE
driverRoute.get("/:id", handleGetOneDriver)

// DELETE ONE DRIVER ROUTE
driverRoute.delete("/:id", handleDeleteOneDriver)

// UPDATE ONE DRIVER ROUTE
driverRoute.patch("/:id", handleUpdateOneDriver)

// UPDATE ONE DRIVER ROUTE
driverRoute.put("/:id", handleUpdateOneDriver)

export default driverRoute