/* Components & Global Styles */
import {ThemeProvider} from 'styled-components';
import GlobalStyle from './styles/GlobalStyle.jsx';
import {theme} from './styles/Base.styles.jsx';
import {Landing} from './components/Landing.jsx';

/* Routing */
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home.jsx';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
