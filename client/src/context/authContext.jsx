import React, { createContext, useState } from "react";

export const Context = createContext();

const AppWrapper = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [background, setBackground] = useState(true);

  return (
    <Context.Provider
      value={{
        authorized,
        setAuthorized,
        background,
        setBackground,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppWrapper;
