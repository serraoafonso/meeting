import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children})=>{
    let teste = true;
    const [user, setUser] = useState(teste ? 'user' : (localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : null));
    const changeUser = (newUser)=>{
        setUser(newUser)
    }

    const [chatAberto, setChatAberto] = useState(false);

    return(
        <UserContext.Provider value={{user, changeUser, chatAberto, setChatAberto}}>
            {children}
        </UserContext.Provider>
    )
}

