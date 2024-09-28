import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const UserContext = createContext();


export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState('');
  
    useEffect(() => {
      const fetchStoredUser = async () => {
        try {
          const storedUser = await AsyncStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } catch (error) {
          console.error('Erro ao recuperar o usuário:', error);
        }
      };
  
      fetchStoredUser();
    }, []);
  
    const verifyUser = (newUser) => {
      setUser(newUser);
    };
  
    useEffect(() => {
      if (user) {
        AsyncStorage.setItem('user', JSON.stringify(user))
          .catch((error) => {
            console.error('Erro ao armazenar o usuário:', error);
          });
      } else {
        AsyncStorage.removeItem('user')
          .catch((error) => {
            console.error('Erro ao remover o usuário:', error);
          });
      }
    }, [user]);
  
    
    return (
      <UserContext.Provider value={{ user, verifyUser }}>{children}</UserContext.Provider>
    );
  };
  