import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import App from 'App';

describe('Testing App', () => {
  it('should renders a list of pokemons initially', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.queryByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.queryByText('Raticate')).toBeInTheDocument();
    });
  });
});
