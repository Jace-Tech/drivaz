import { CREATE_DRIVER_ENDPOINT, DELETE_DRIVER_ENDPOINT, GET_ALL_DRIVERS_ENDPOINT, GET_ONE_DRIVER_ENDPOINT, UPDATE_DRIVER_ENDPOINT } from "./endpoint"

// GENERATE REQUEST OPTIONS
const getPostOptions = (data: any, method: string = "POST") => {
  const options: RequestInit = {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }
  return options
}

// GETS ALL DRIVERS
export const fetchDrivers = async () => {
  try {
    const request = await fetch(GET_ALL_DRIVERS_ENDPOINT)
    const result = await request.json()
    return result
  } catch (error: any) {
    return { success: false, message: error.message, data: null}
  }
}

// GETS ONE DRIVER
export const fetchOneDriver = async (id: string) => {
  try {
    const request = await fetch(GET_ONE_DRIVER_ENDPOINT.replace(":id", id))
    const result = await request.json()
    return result
  } catch (error: any) {
    return { success: false, message: error.message, data: null}
  }
}

// DELETE DRIVER
export const deleteDriver = async (id: string) => {
  try {
    const request = await fetch(DELETE_DRIVER_ENDPOINT.replace(":id", id))
    const result = await request.json()
    return result
  } catch (error: any) {
    return { success: false, message: error.message, data: null}
  }
}

// UPDATE DRIVER
export const updateDriver = async (data: IDriver) => {
  try {
    const request = await fetch(UPDATE_DRIVER_ENDPOINT.replace(":id", data.driverIdentificationNumber), getPostOptions(data, "PATCH"))
    const result = await request.json()
    return result
  } catch (error: any) {
    return { success: false, message: error.message, data: null}
  }
}

// CREATES A DRIVER
export const createDriver = async (data: IDriver) => {
  try {
    const request = await fetch(CREATE_DRIVER_ENDPOINT, getPostOptions(data))
    const result = await request.json()
    return result
  } catch (error: any) {
    return { success: false, message: error.message, data: null}
  }
}