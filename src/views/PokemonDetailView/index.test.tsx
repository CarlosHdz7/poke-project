import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from 'store';
import AppRouter from 'views/AppRouter';
import PokemonDetailView from 'views/PokemonDetailView';
import bookmarksMock from 'mocks/bookmarksMock';

describe('Testing Pokemon Detail view', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  beforeEach(() => useSelectorMock.mockClear());

  it('should shows to pokemon details', async () => {
    useSelectorMock.mockReturnValue(bookmarksMock);

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

  it('should go back to previous page (Pokemons List)', async () => {
    useSelectorMock.mockReturnValue(bookmarksMock);

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

  it('should redirect to 404', async () => {
    useSelectorMock.mockReturnValue(bookmarksMock);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemons/error']}>
          <PokemonDetailView />
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('Pokemon not found')).toBeInTheDocument();
  });
});
