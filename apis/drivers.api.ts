import { json, logger } from "../utils/helpers"
import { CREATE_DRIVER_ENDPOINT, DELETE_DRIVER_ENDPOINT, GET_ALL_DRIVERS_ENDPOINT, GET_ONE_DRIVER_ENDPOINT, UPDATE_DRIVER_ENDPOINT, UPLOAD_ENDPOINT } from "./endpoint"

// GENERATE REQUEST OPTIONS
const getPostOptions = (data: any, method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE" = "POST", override: RequestInit = {}) => {
  const options: RequestInit = {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    ...override
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
    const request = await fetch(DELETE_DRIVER_ENDPOINT.replace(":id", id), { method: "DELETE" })
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
    if(data?.image) {
      logger(json({image: data.image}))
      const reqImage = await fetch(UPLOAD_ENDPOINT, getPostOptions({ image: data.image }))
      const response = await reqImage.json()
      logger(json({response}))
      if(!response.success) throw new Error(response?.message)
      data.image = response?.data?.url
    }
    const request = await fetch(CREATE_DRIVER_ENDPOINT, getPostOptions(data))
    const result = await request.json()
    return result
  } catch (error: any) {
    return { success: false, message: error.message, data: null}
  }
}