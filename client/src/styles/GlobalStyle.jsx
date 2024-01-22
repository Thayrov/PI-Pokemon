import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-width: 0;
  }

  body {
    font-family: system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden; 
  background: repeating-linear-gradient(
    -45deg,
    rgba(${({theme: {colors}}) => colors.BlackOlive}, 0.7),
    rgba(${({theme: {colors}}) => colors.BlackOlive}, 0.7) 5px,
    rgba(${({theme: {colors}}) => colors.Jet}, 0.7) 5px,
    rgba(${({theme: {colors}}) => colors.Jet}, 0.7) 25px
  );
  }
`;

export default GlobalStyle;
