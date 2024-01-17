import {ThemeProvider} from 'styled-components';
import GlobalStyle from './styles/GlobalStyle.jsx';
import {theme} from './styles/Base.styles.jsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <h1>Henry Pokemon</h1>
      </div>
    </ThemeProvider>
  );
}

export default App;
