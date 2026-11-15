import React, { createContext, useContext, useEffect } from 'react';

export type Theme = 'light';

interface ThemeContextType {
  theme: 'light';
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'light' });

/**
 * Permanent Light Mode Theme Provider for Cane's Serve.
 * Enforces warm artisan cream and espresso aesthetic with zero dark mode switches.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'light');
    root.classList.remove('dark');

    // Purge any previously stored dark theme preference
    try {
      localStorage.removeItem('canes_coffee_theme');
      localStorage.setItem('canes_coffee_theme', 'light');
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    // Set mobile browser theme bar to cafe espresso color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#3B322C');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'light' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};
