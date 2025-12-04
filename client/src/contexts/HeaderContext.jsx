// client/src/contexts/HeaderContext.jsx
import React, { createContext, useContext, useState } from 'react';

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  // Creamos una función vacía para que cuando Home llame a setTitle no pase nada malo
  const [title, setTitle] = useState(null);

  return (
    <HeaderContext.Provider value={{ title, setTitle }}>
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeader = () => useContext(HeaderContext);