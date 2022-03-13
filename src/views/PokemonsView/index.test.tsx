import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PokemonsView from '.';
import { renderWithMemoryRouter } from 'utils/wrapper';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import store from 'store';
import AppRouter from 'views/AppRouter';

describe('Testing Pokemon list view', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should renders a list of pokemons initially', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonsView />
        </BrowserRouter>
      </Provider>,
    );
    await screen.findByText('Bulbasaur');
    await screen.findByText('Ivysaur');
    await screen.findByText('Charmander');
    await screen.findByText('Raticate');
  });

  it('should shows pokemon of page 2', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonsView />
        </BrowserRouter>
      </Provider>,
    );
    const buttons = await screen.findAllByText(/2/i);

    fireEvent.click(buttons[0]);
    await screen.findByText('Spearow');
  });

  it('should redirect a pokemon details', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <PokemonsView />
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );

    const card = await screen.findByRole('button', {
      name: /Bulbasaur/i,
    });
    fireEvent.click(card);

    expect(await screen.findByText('Bulbasaur')).toBeInTheDocument();
    expect(await screen.findByText('Attack')).toBeInTheDocument();
    expect(await screen.findByText('Defense')).toBeInTheDocument();
  });

  it('should search a pokemon', async () => {
    renderWithMemoryRouter(<PokemonsView />, ['/'], true);

    const searchBar = await screen.findAllByPlaceholderText(/Search/i);

    fireEvent.change(searchBar[0], { target: { value: 'Pikachu' } });
    await new Promise((r) => setTimeout(r, 1000));
    expect(await screen.findByText('Pikachu')).toBeInTheDocument();

    fireEvent.change(searchBar[0], { target: { value: '' } });
    await new Promise((r) => setTimeout(r, 1000));
    expect(await screen.findByText('Bulbasaur')).toBeInTheDocument();
  });

  it('should show no results', async () => {
    renderWithMemoryRouter(<PokemonsView />, ['/'], true);

    const searchBar = await screen.findAllByPlaceholderText(/Search/i);

    fireEvent.change(searchBar[0], { target: { value: 'sfaasf' } });
    await new Promise((r) => setTimeout(r, 1000));
    expect(await screen.findByText(/No results/i)).toBeInTheDocument();
  });
});
