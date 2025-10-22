import { useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type AccentColor = 'theme-blue' | 'theme-green' | 'theme-purple' | 'theme-orange' | 'theme-pink';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme') as ThemeMode;
    return saved || 'auto';
  });
  
  const [accent, setAccent] = useState<AccentColor>(() => {
    const saved = localStorage.getItem('accent') as AccentColor;
    return saved || 'theme-blue';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Handle theme mode
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.remove('light', 'dark');
      root.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
    
    localStorage.setItem('theme', theme);
    
    // Handle accent color
    root.classList.remove('theme-blue', 'theme-green', 'theme-purple', 'theme-orange', 'theme-pink');
    root.classList.add(accent);
    localStorage.setItem('accent', accent);

  }, [theme, accent]);

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mediaQuery.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'auto';
      return 'light';
    });
  };

  const changeAccent = (newAccent: AccentColor) => {
    setAccent(newAccent);
  };

  const getCurrentTheme = () => {
    if (theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };

  return { 
    theme, 
    toggleTheme, 
    accent, 
    changeAccent, 
    getCurrentTheme 
  };
};
