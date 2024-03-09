// GridContext.js
import React, { createContext, useContext, useState } from "react";

// Create a context for the grid state
const GridContext = createContext();

// Create a custom hook to consume the grid context
export const useGrid = () => useContext(GridContext);

// Create a provider component to wrap your app and provide the grid state
export const GridProvider = ({ children }) => {
  const [grid, setGrid] = useState([[]]);

  return (
    <GridContext.Provider value={{ grid, setGrid }}>
      {children}
    </GridContext.Provider>
  );
};
