import React, { createContext, useContext, useState } from 'react';
import CheckApp from './frontend/body/CheckApp'

const CheckAppContext = createContext();

export  default function CheckAppProvider({ children }) {
  const [selectedApp, setSelectedApp] = useState(null);

  const value = {
    showCheckApp: (app) => setSelectedApp(app),
    hideCheckApp: () => setSelectedApp(null),
    selectedApp
  };

  return (
    <CheckAppContext.Provider value={value}>
      {children}
      {selectedApp && <CheckApp app={selectedApp} />}
    </CheckAppContext.Provider>
  );
}

export const useCheckApp = () => useContext(CheckAppContext);