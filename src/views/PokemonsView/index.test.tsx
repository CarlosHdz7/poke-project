import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PokemonsView from '.';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import store from 'store';
import AppRouter from 'views/AppRouter';
import userEvent from '@testing-library/user-event';

describe('Testing Pokemon list view', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should renders a list of pokemons initially', async () => {
    // Render
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonsView />
        </BrowserRouter>
      </Provider>,
    );

    // Assertions
    await waitFor(() => {
      expect(screen.queryByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.queryByText('Raticate')).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  it('should shows pokemon of page 2', async () => {
    // Render
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonsView />
        </BrowserRouter>
      </Provider>,
    );

    // Interact / Act
    const buttons = await screen.findAllByText(/2/i);
    userEvent.click(buttons[0]);

    // Assertions
    await waitFor(() => {
      expect(screen.queryByText('Spearow')).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  it('should search a pokemon', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );

    await screen.findByText(/Bulbasaur/i);
    const searchBar = screen.getByPlaceholderText(/Search/i);

    userEvent.type(searchBar, 'Pika');

    await waitFor(
      () => {
        expect(screen.queryByText(/Pikachu/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    userEvent.type(searchBar, '{backspace}{backspace}{backspace}{backspace}');

    await waitFor(
      () => {
        expect(screen.queryByText(/Pikachu/i)).toBeNull();
        expect(screen.queryByText(/Bulbasaur/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('should show no results', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );

    await screen.findByText(/Bulbasaur/i);
    const searchBar = screen.getByPlaceholderText(/Search/i);

    userEvent.type(searchBar, 'asadsfa');

    await waitFor(
      () => {
        expect(screen.queryByText(/No results/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('should redirect to pokemon details', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemons']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );

    const card = await screen.findByText(/Bulbasaur/i);
    userEvent.click(card);

    await waitFor(() => {
      expect(screen.queryByText(/Name: Bulbasaur/i)).toBeInTheDocument();
      expect(screen.queryByText('Attack')).toBeInTheDocument();
      expect(screen.queryByText('Defense')).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });
});
