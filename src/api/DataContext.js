import React, { createContext, useState } from "react";

// Buat context
export const DataContext = createContext();

// Buat provider
export const DataProvider = ({ children }) => {
  const [logData, setLogData] = useState([]);
  return (
    <DataContext.Provider value={{ logData, setLogData }}>
      {children}
    </DataContext.Provider>
  );
};
