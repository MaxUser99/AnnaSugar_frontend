import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import 'normalize.css';
import 'fontsource-cormorant-infant';
import 'fontsource-montserrat-alternates';

export const theme =  {
  color: { 
    beige: '#E5E3DC',
    darkBeige: '#DAD8D1',
    black: '#222222',
    mutted: '#00000099',
  },
  text: {
    white: '#FFFFFF',
    mutted: '#777672',
    default: '#000000',
    header: '#1A1B1E',
    lighter: '#1F1F1F',
    lighter2: '#0A0A0A'
  }
};

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Montserrat Alternates";
    min-width: 375px;
  }
  button {
    outline: none;
    :focus, :active {
      outline: none;
    } 
  }
`;

export const ThemeWrapper = ({ children }) => (
  <>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </>
);

export const BREAKPOINTS = {
  MOBILE: 475,
  TABLET: 700,
  DESCTOP: 1200,
};

export const $maxWidth = (brekpoint, css) => `
  @media screen and (max-width: ${brekpoint}px) { ${ css } }
`
export const $minWidth = (brekpoint, css) => `
  @media screen and (min-width: ${brekpoint}px) { ${ css } }
`

