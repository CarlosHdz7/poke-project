import React from 'react';
import { render, waitFor } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import PokemonCard from '.';
import bookmarksMock from 'mocks/bookmarksMock';

describe('Testing Pokemon list view', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    useSelectorMock.mockReturnValue(bookmarksMock);
  });

  it('should render a card with the basic information of a pokemon', async () => {
    const card = render(
      <reactRedux.Provider store={store}>
        <BrowserRouter>
          <PokemonCard
            image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            name="Pikachu"
            id={25}
            type={['electric']}
          ></PokemonCard>
        </BrowserRouter>
      </reactRedux.Provider>,
    );

    await waitFor(() => {
      expect(card.queryByText('Pikachu')).toBeInTheDocument();
      expect(card.queryByText('electric')).toBeInTheDocument();
    });
  });

  it('should show a heart inside the card', async () => {
    render(
      <reactRedux.Provider store={store}>
        <BrowserRouter>
          <PokemonCard
            image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            name="Pikachu"
            id={25}
            type={['electric']}
          ></PokemonCard>
        </BrowserRouter>
      </reactRedux.Provider>,
    );

    const icon = document.querySelector('.like-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should not show a heart inside the card', async () => {
    render(
      <reactRedux.Provider store={store}>
        <BrowserRouter>
          <PokemonCard
            image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            name="Ivysaur"
            id={2}
            type={['grass', 'poison']}
          ></PokemonCard>
        </BrowserRouter>
      </reactRedux.Provider>,
    );

    const icon = document.querySelector('.like-icon');
    expect(icon).not.toBeInTheDocument();
  });
});
