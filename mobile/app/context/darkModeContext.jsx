import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Carrega o estado do modo escuro do armazenamento assíncrono ao iniciar o app
    const loadDarkMode = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('darkMode');
        if (storedDarkMode !== null) {
          setDarkMode(storedDarkMode === 'true');
        }
      } catch (e) {
        console.error('Failed to load dark mode state', e);
      }
    };

    loadDarkMode();
  }, []);

  const toggle = async () => {
    try {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode);
      await AsyncStorage.setItem('darkMode', newDarkMode.toString());
    } catch (e) {
      console.error('Failed to save dark mode state', e);
    }
  };

  return (
    <DarkModeContext.Provider value={{ toggle, darkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

