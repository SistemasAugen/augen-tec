import React, { ReactNode, createContext, useState } from 'react';
export const AppContext = createContext({
  openDrawer: false,
  handleToggleDrawer: () => {},
});

export const AppContextProvider  = ({ children }: { children: React.ReactNode }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
  
    const handleToggleDrawer = () => {
      setOpenDrawer(!openDrawer);
    };
  
    return (
      <AppContext.Provider value={{ openDrawer, handleToggleDrawer }}>
        {children}
      </AppContext.Provider>
    );
  };