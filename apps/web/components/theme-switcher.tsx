'use client';

import { ThemeToggleButton } from '@repo/ui/components/theme-toggle-button';
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />;
}
