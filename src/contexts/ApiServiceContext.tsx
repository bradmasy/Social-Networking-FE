import React, { ReactNode, createContext, useContext } from 'react';
import { ApiService } from '../services/api/ApiService';

// Create an instance of ApiService
const apiServiceInstance = new ApiService();

// Create the context with the instance of ApiService
const ApiServiceContext = createContext(apiServiceInstance);

export const useApiService = () => useContext(ApiServiceContext);

export const ApiServiceProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ApiServiceContext.Provider value={apiServiceInstance}>
      {children}
    </ApiServiceContext.Provider>
  );
};