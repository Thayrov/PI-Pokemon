//eslint-disable-next-line
import React from 'react';
import {render, screen} from '@testing-library/react';
import Button from '../src/components/Button';
import {ThemeProvider} from 'styled-components';
import {theme} from '../src/styles/Base.styles';

test('renders Button with children', () => {
  const buttonText = 'Test Button';
  render(
    <ThemeProvider theme={theme}>
      <Button>{buttonText}</Button>
    </ThemeProvider>,
  );
  const buttonElement = screen.getByText(buttonText);
  expect(buttonElement).toBeInTheDocument();
});
