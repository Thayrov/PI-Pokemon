import {ThemeProvider} from 'styled-components';
import GlobalStyle from './styles/GlobalStyle.jsx';
import {theme} from './styles/Base.styles.jsx';
import {Landing} from './components/Landing.jsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Landing />
    </ThemeProvider>
  );
}

export default App;
