import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/globals.css';

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];
