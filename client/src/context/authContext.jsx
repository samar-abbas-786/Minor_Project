import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

const AppWrapper = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [prof, setProf] = useState();
  const [background, setBackground] = useState(true);

  const [userDetail, setUserDetails] = useState({});
  const [course, setCourse] = useState(null);
  const [isProfile, setIsProfile] = useState(false);
  const [students, setStudent] = useState([]);

  const [profilePicture, setProfilePicture] = useState(
    "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?ga=GA1.1.732799867.1719772377&semt=ais_hybrid"
  );

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
        profilePicture,
        course,
        setCourse,
        isProfile,
        setIsProfile,
        prof,
        setProf,
        students,
        setStudent,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppWrapper;
