import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonsView from '.';
import store from 'store';
import Error404 from 'views/Errors/Error404';
import AppRouter from 'views/AppRouter';
import PokemonDetailView from 'views/PokemonDetailView';
import appRoutes from 'routes';
describe('Testing Pokemon list view', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
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

  it('should renders a search bar', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonsView />
        </BrowserRouter>
      </Provider>,
    );
    await screen.getByPlaceholderText(/Search/i);
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
        <BrowserRouter>
          <PokemonsView />
          <AppRouter />
        </BrowserRouter>
      </Provider>,
    );

    const card = await screen.findByRole('button', {
      name: /Spearow/i,
    });
    fireEvent.click(card);

    expect(await screen.findByText('Spearow')).toBeInTheDocument();
    expect(await screen.findByText('Attack')).toBeInTheDocument();
    expect(await screen.findByText('Defense')).toBeInTheDocument();
  });

  it('should shows to pokemon details', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemons/1']}>
          <PokemonDetailView />
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );
    expect(await screen.findByText(/Name: Bulbasaur/i)).toBeInTheDocument();
    expect(await screen.findByText('Attack')).toBeInTheDocument();
    expect(await screen.findByText('Defense')).toBeInTheDocument();
  });

  it('should redirect to 404', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemons/error']}>
          <PokemonsView />
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );

    // screen.findByText(/Pokemon not found/i);
    expect(await screen.findByText('Pokemon not found')).toBeInTheDocument();
  });

  it('should go back to previous page (Pokemons List)', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemons', '/pokemons/1']}>
          <PokemonDetailView />
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );
    expect(await screen.findByText(/Name: Bulbasaur/i)).toBeInTheDocument();
    expect(await screen.findByText('Attack')).toBeInTheDocument();
    expect(await screen.findByText('Defense')).toBeInTheDocument();

    const icon = document.querySelector('.bi-arrow-left-circle-fill');

    if (icon) {
      fireEvent.click(icon);
      expect(await screen.findByText(/Pokemons List/i)).toBeInTheDocument();
    }
  });
});
