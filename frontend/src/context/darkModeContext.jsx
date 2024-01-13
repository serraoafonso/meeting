import { createContext, useContext, useState } from "react";

export const DarkModeContext= createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") == "true" ? true : false
  );

  const toggle = () => {
    setDarkMode((prev) => !prev);
    if(localStorage.getItem("darkMode") == "true" ){
        localStorage.setItem("darkMode",  false);
    }else{
        localStorage.setItem("darkMode",  true);
    }
  };


  return <DarkModeContext.Provider value={{toggle, darkMode}}>{children}</DarkModeContext.Provider>;
};
