import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { deleteDriver, fetchDrivers, updateDriver } from "../apis/drivers.api";
import { AlertDialog, Button, useDisclose } from "native-base";
import { json, logger } from "../utils/helpers";

interface DriversContextProps { 
  drivers: IDriver[];
  handleUpdateDriver: (data: IDriver) => Promise<{ data: any, success: boolean, message: string }>;
  handleDeleteDriver: (id: string) => Promise<{ data: any, success: boolean, message: string }>;
}
const DriversContext = createContext({} as DriversContextProps);

interface DriversContextProviderProps {
  children: ReactNode;
}

const DriversContextProvider: React.FC<DriversContextProviderProps> = ({ children }) => {
  const [drivers, setDrivers] = useState<IDriver[]>([])

  // GETS ALL DRIVERS
  const populateDriversState = useCallback(async () => {
    const result = await fetchDrivers()
    if(!result?.success) return
    setDrivers(result.data)
  }, [])

  // UPDATES DRIVER
  const handleUpdateDriver = async (data: IDriver) => {
    const result = await updateDriver(data)
    if(!result?.success) return result
    
    const index = drivers.findIndex(driver => driver._id === data._id)
    if(!index && index !== 0) return result
    
    populateDriversState()
    return result
  }

  // DELETE DRIVER
  const handleDeleteDriver = async (id: string) => {
    const result = await deleteDriver(id)
    if(!result?.success) return result
    
    const index = drivers.findIndex(driver => driver.driverIdentificationNumber === id)
    if(!index) return result

    const newData = {...drivers}
    newData.splice(index, 1)
    setDrivers(newData)
    return result
  }

  useEffect(() => {
    if(drivers.length) return;
    populateDriversState()
  }, [])

  useEffect(() => {
    console.log({drivers})
  }, [drivers])

  
  return (
    <DriversContext.Provider value={{ drivers, handleUpdateDriver, handleDeleteDriver }}>
      {children}
    </DriversContext.Provider>
  )
}

export default DriversContextProvider

export const useDriversContext = () => useContext(DriversContext);