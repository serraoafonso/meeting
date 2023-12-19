import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children})=>{
    let teste = true
    const [user, setUser] = useState(teste ? 'user' : (localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : null));
    const changeUser = (newUser)=>{
        setUser(newUser)
        
    }

    return(
        <UserContext.Provider value={{user, changeUser}}>
            {children}
        </UserContext.Provider>
    )
}

