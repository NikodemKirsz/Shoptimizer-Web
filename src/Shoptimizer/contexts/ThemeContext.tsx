import { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from "react-native";

type ThemeContextType = {
  isDarkTheme: boolean,
  setIsDarkTheme: (isDarkTheme: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: true,
  setIsDarkTheme: () => {}
});

interface Props {
  children: ReactNode;
}

function ThemeProvider(props: Props) {
  const {children} = props;
  
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          const savedIsDarkTheme = savedTheme == true.toString();
          setIsDarkTheme(savedIsDarkTheme);
        }
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    })()
      .catch(console.error);
  }, []);

  const setIsDarkThemeInternal = (isDarkTheme: boolean) => {
    setIsDarkTheme(isDarkTheme);
    AsyncStorage.setItem('theme', isDarkTheme.toString())
      .catch(console.error);
  };

  return (
    <ThemeContext.Provider value={{isDarkTheme: isDarkTheme, setIsDarkTheme: setIsDarkThemeInternal}}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };