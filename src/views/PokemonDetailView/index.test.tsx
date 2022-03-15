import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from 'store';
import AppRouter from 'views/AppRouter';
import PokemonDetailView from 'views/PokemonDetailView';
import bookmarksMock from 'mocks/bookmarksMock';

describe('Testing Pokemon Detail view', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

  it('should shows pokemon details', async () => {
    useSelectorMock.mockReturnValue(bookmarksMock);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemons/1']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );
    expect(await screen.findByText(/Name: Bulbasaur/i)).not.toBeNull();
    expect(screen.getByText('Attack')).not.toBeNull();
    expect(screen.getByText('Defense')).not.toBeNull();
    const icon = document.querySelector('.like-icon-2');
    expect(icon).not.toBeNull();
  });

  it('should go back to previous page (Pokemons List)', async () => {
    useSelectorMock.mockReturnValue(bookmarksMock);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemons', '/pokemons/1']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText(/Name: Bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('Defense')).toBeInTheDocument();

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
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('Pokemon not found')).toBeInTheDocument();
  });
});
