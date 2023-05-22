import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { createDriver, deleteDriver, fetchDrivers, updateDriver } from "../apis/drivers.api";
import { json, logger } from "../utils/helpers";

interface DriversContextProps { 
  drivers: IDriver[];
  handleUpdateDriver: (data: IDriver) => Promise<{ data: any, success: boolean, message: string }>;
  handleCreateDriver: (data: IDriver) => Promise<{ data: any, success: boolean, message: string }>;
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
    populateDriversState()
    return result
  }

  // CREATE DRIVER
  const handleCreateDriver = async (data: IDriver) => {
    const result = await createDriver(data)
    if(!result?.success) return result
    populateDriversState()
    return result
  }

  // DELETE DRIVER
  const handleDeleteDriver = async (id: string) => {
    const result = await deleteDriver(id)
    logger(json({result}))
    if(!result?.success) return result
    populateDriversState()
    return result
  }

  useEffect(() => {
    if(drivers.length) return;
    populateDriversState()
  }, [])

  useEffect(() => {
    logger({drivers})
  }, [drivers])

  
  return (
    <DriversContext.Provider value={{
      drivers, 
      handleCreateDriver, 
      handleUpdateDriver, 
      handleDeleteDriver,
    }}>
      {children}
    </DriversContext.Provider>
  )
}

export default DriversContextProvider

export const useDriversContext = () => useContext(DriversContext);