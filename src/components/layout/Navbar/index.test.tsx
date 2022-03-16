import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import PokemonsView from '.';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import store from 'store';
import AppRouter from 'views/AppRouter';
import userEvent from '@testing-library/user-event';
import { renderWithMemoryRouter } from 'utils/wrapper';

describe('Testing Navbar', () => {
  afterEach(cleanup);

  it('should render correctly', async () => {
    // render(
    //   <Provider store={store}>
    //     <MemoryRouter initialEntries={['/pokemons']}>
    //       <AppRouter />
    //     </MemoryRouter>
    //   </Provider>,
    // );

    renderWithMemoryRouter(['/pokemons']);

    expect(screen.queryAllByText(/PokeApi/i)).toHaveLength(2);
    expect(screen.queryAllByText(/Bookmarks/i)).toHaveLength(2);
    expect(screen.queryAllByText(/About/i)).toHaveLength(2);
  });

  it('should show sidebar', async () => {
    renderWithMemoryRouter(['/pokemons']);

    expect(screen.queryAllByText(/PokeApi/i)).toHaveLength(2);
    expect(screen.queryAllByText(/Bookmarks/i)).toHaveLength(2);
    expect(screen.queryAllByText(/About/i)).toHaveLength(2);
    const sideButton = document.querySelector('.side-button') as Element;
    userEvent.click(sideButton);

    await waitFor(() => {
      expect(screen.queryByText(/Side Bar Options/i)).toBeInTheDocument;
    });
  });

  it('should hide sidebar', async () => {
    renderWithMemoryRouter(['/pokemons']);

    const sideButton = document.querySelector('.side-button') as Element;
    userEvent.click(sideButton);

    await waitFor(() => {
      expect(screen.queryByText(/Side Bar Options/i)).toBeInTheDocument;
    });

    const sideButtonClose = document.querySelector('.side-button-close') as Element;
    userEvent.click(sideButtonClose);

    await waitFor(() => {
      expect(screen.queryByText(/Side Bar Options/i)).not.toBeInTheDocument;
    });
  });
});
