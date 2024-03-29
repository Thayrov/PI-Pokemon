/* Components & Global Styles */
import {ThemeProvider} from 'styled-components';
import GlobalStyle from './styles/GlobalStyle.jsx';
import {theme} from './styles/Base.styles.jsx';
import {Landing} from './components/Landing.jsx';

/* Routing */
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home.jsx';
import {AppContainer} from './styles/App.styles.jsx';
import PokemonForm from './components/Form.jsx';
import Detail from './components/Detail.jsx';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/form' element={<PokemonForm />} />
          <Route path='/detail/:id' element={<Detail />} />
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
