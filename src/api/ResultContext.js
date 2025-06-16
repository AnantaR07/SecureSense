// ResultContext.js
import React, { createContext, useState } from "react";

export const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [resultData, setResultData] = useState([]);

  return (
    <ResultContext.Provider value={{ resultData, setResultData }}>
      {children}
    </ResultContext.Provider>
  );
};
