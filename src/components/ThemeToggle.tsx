import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return faSun;
      case 'dark':
        return faMoon;
      case 'auto':
        return faDesktop;
      default:
        return faDesktop;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'auto':
        return 'Auto';
      default:
        return 'Auto';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-accent transition-colors duration-200 text-muted-foreground hover:text-accent-foreground"
      aria-label={`Switch to ${getLabel()} theme`}
    >
      <FontAwesomeIcon icon={getIcon()} className="w-4 h-4" />
      <span className="text-sm font-medium">{getLabel()}</span>
    </button>
  );
};