import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children})=>{
    const [user, setUser] = useState(localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : null);
    const changeUser = (newUser)=>{
        setUser(newUser)
    }

    return(
        <UserContext.Provider value={{user, changeUser}}>
            {children}
        </UserContext.Provider>
    )
}

