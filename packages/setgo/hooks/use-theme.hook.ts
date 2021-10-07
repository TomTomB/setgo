import { useEffect, useState } from 'react';
type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  const themeEventHandler = (event: MediaQueryListEvent) => {
    const currentHardTheme = window.localStorage.getItem('theme');

    if (currentHardTheme) {
      return;
    }

    if (event.matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const updateTheme = (theme: 'light' | 'dark' | 'system') => {
    if (theme === 'system') {
      window.localStorage.removeItem('theme');

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', themeEventHandler);
    } else {
      window.localStorage.setItem('theme', theme);
      setTheme('dark');
    }
  };

  useEffect(() => {
    const currentHardTheme =
      (window.localStorage.getItem('theme') as Theme | null) ?? 'system';
    updateTheme(currentHardTheme);
  });

  return theme;
};
