// client/src/contexts/HeaderContext.jsx
import React, { createContext, useContext } from 'react';
const HeaderContext = createContext();
export const HeaderProvider = ({ children }) => <HeaderContext.Provider value={{ setTitle: () => {} }}>{children}</HeaderContext.Provider>;
export const useHeader = () => useContext(HeaderContext);