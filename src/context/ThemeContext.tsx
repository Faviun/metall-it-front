import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Инициализируем состояние темы, пытаясь загрузить его из localStorage,
  // иначе устанавливаем 'light' по умолчанию
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('app-theme');
    return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'light';
  });

  // useEffect для сохранения темы в localStorage при ее изменении
  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    // Добавляем или удаляем класс 'dark' из <html> элемента
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Функция для переключения темы
  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Функция для прямого установки темы
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const value = { theme, toggleTheme, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Хук для использования контекста темы
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};