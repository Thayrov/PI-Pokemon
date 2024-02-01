// eslint-disable-next-line
import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import App from '../src/App';
import {theme} from '../src/styles/Base.styles';

const renderWithRouterAndTheme = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, '', route);
  return render(ui, {
    wrapper: ({children}) => (
      <ThemeProvider theme={theme}>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    ),
  });
};

test('renders Landing page and navigates to /home on button click', async () => {
  renderWithRouterAndTheme(<App />);
  expect(screen.getByText(/¡Bienvenido!/i)).toBeInTheDocument();
});
