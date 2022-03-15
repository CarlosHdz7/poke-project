import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import store from 'store';
import Error404 from '.';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import AppRouter from 'views/AppRouter';

describe('Testing 404 page', () => {
  it('should render correctly', async () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Error404 />
          </BrowserRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show the correct text', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Error404 />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.queryByText(/404/i)).not.toBe(null);
    expect(screen.queryByText(/Pokemon not found/i)).not.toBe(null);
    expect(screen.queryByText(/Go back to list/i)).not.toBe(null);
  });

  it('should redirect to pokemons list', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Error404 />
          <AppRouter />
        </BrowserRouter>
      </Provider>,
    );
    const button = screen.getByText(/Go back to list/i);
    userEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByText('Pokemons List')).toBeInTheDocument();
    });
  });
});
