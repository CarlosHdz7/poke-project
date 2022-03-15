import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
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

    await waitFor(() => {
      expect(screen.queryByText(/Name: Bulbasaur/i)).toBeInTheDocument();
      expect(screen.queryByText('Attack')).toBeInTheDocument();
      expect(screen.queryByText('Defense')).toBeInTheDocument();
      const icon = document.querySelector('.like-icon-2');
      expect(icon).toBeInTheDocument();
    });
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

    await waitFor(() => {
      expect(screen.queryByText(/Name: Bulbasaur/i)).toBeInTheDocument();
      expect(screen.queryByText('Attack')).toBeInTheDocument();
      expect(screen.queryByText('Defense')).toBeInTheDocument();
    });

    const icon = document.querySelector('.bi-arrow-left-circle-fill') as Element;

    fireEvent.click(icon);

    await waitFor(() => {
      expect(screen.queryByText(/Pokemons List/i)).toBeInTheDocument();
      expect(screen.queryByText(/Bulbasaur/i)).toBeInTheDocument();
      expect(screen.queryByText(/Raticate/i)).toBeInTheDocument();
    });
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
