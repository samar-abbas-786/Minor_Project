import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

const AppWrapper = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [background, setBackground] = useState(true);
  const [userDetail, setUserDetails] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserDetails(JSON.parse(localStorage.getItem("user")));
      setAuthorized(true);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        authorized,
        setAuthorized,
        background,
        setBackground,
        userDetail,
        setUserDetails,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppWrapper;
