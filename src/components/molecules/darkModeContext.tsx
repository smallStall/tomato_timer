import { createContext, useState, useContext } from 'react';

export function useDarkModeContext() {
  return useContext(DarkModeContext);
}

const  useValue = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false); 
  return {
    isDarkMode,
    setDarkMode
  }
}

const DarkModeContext = createContext({} as ReturnType<typeof useValue>);

type Props = {
  children: React.ReactNode,
}

export function DarkModeProvider({ children } : Props) {
  const [isDarkMode, setDarkMode] = useState<boolean>(false); 
  const value = {
    isDarkMode,
    setDarkMode
  }
  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  )
}