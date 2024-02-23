import { createTheme } from '@mantine/core';
import { MantineColorsTuple } from '@mantine/core';

const primaryColor: MantineColorsTuple = [
  '#faedff',
  '#edd9f7',
  '#d8b1ea',
  '#c286dd',
  '#ae62d2',
  '#a24bcb',
  '#9e3fc9',
  '#8931b2',
  '#7b2aa0',
  '#6b218d',
];

const theme = createTheme({
  fontFamily: 'Inter, Roboto, sans-serif',
  primaryColor: 'primaryColor',
  colors: {
    primaryColor: primaryColor,
  },
});
export default theme;
