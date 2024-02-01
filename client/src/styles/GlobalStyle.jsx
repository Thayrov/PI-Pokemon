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
  height: 100vh;
  display: flex;
  justify-content: center;
  background-attachment: fixed;
  background: repeating-linear-gradient(
    -45deg,
    rgba(${({theme: {colors}}) => colors.BlackOlive}, 0.7),
    rgba(${({theme: {colors}}) => colors.BlackOlive}, 0.7) 5px,
    rgba(${({theme: {colors}}) => colors.Jet}, 0.7) 5px,
    rgba(${({theme: {colors}}) => colors.Jet}, 0.7) 25px
  );
  font-variant: small-caps;

  }

  /* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #EF594F #40413F;
}

/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #40413F;
}

*::-webkit-scrollbar-track:hover {
  background-color: #E2E3E4;
}

*::-webkit-scrollbar-track:active {
  background-color: #f6f7f8;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #EF594F;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #EF594F;
}

*::-webkit-scrollbar-thumb:active {
  background-color: #EF594F;
}

`;

export default GlobalStyle;
