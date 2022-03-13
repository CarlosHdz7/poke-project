import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from 'store';
import AppRouter from 'views/AppRouter';
import PokemonDetailView from 'views/PokemonDetailView';
import { IBookmark } from 'interfaces/IBookmark';

const bookmarksMock: IBookmark[] = [
  {
    uid: 25,
    pokemon: {
      id: 25,
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      stats: [
        {
          name: 'Hp',
          base: 35,
        },
        {
          name: 'Attack',
          base: 55,
        },
        {
          name: 'Defense',
          base: 40,
        },
        {
          name: 'Special-Attack',
          base: 50,
        },
        {
          name: 'Special-Defense',
          base: 50,
        },
        {
          name: 'Speed',
          base: 90,
        },
      ],
      type: ['electric'],
    },
  },
];

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
