import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import PokemonsView from '.';
import store from 'store';
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

  it('should shows a pokemon details', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonsView />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      const card = screen.getByRole('button', {
        name: /pikachu/i,
      });
      fireEvent.click(card);
    });

    screen.findByText(/Hp/i);
    screen.findByText(/Attack/i);
  });

  it('should redirect to pokemon details', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['Test page', '/pokemons/1']}>
          <PokemonsView />
        </MemoryRouter>
      </Provider>,
    );

    screen.findByText(/Bulbasaur/i);
  });

  it('should redirect to 404', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['Test page', '/pokemons/error']}>
          <PokemonsView />
        </MemoryRouter>
      </Provider>,
    );

    screen.findByText(/Pokemon not found/i);
  });
});
