import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import PokemonCard from '.';
import bookmarksMock from 'mocks/bookmarksMock';

describe('Testing Pokemon list view', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

  beforeEach(() => useSelectorMock.mockClear());

  it('should render a card with the basic information of a pokemon', async () => {
    useSelectorMock.mockReturnValue(bookmarksMock);
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

    await card.findByText('Pikachu');
    await card.findByText('electric');
  });

  it('should show a heart inside the card', async () => {
    useSelectorMock.mockReturnValue(bookmarksMock);
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
    useSelectorMock.mockReturnValue(bookmarksMock);
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

  it('should redirect to pokemon detail', async () => {
    useSelectorMock.mockReturnValue(bookmarksMock);

    render(
      <reactRedux.Provider store={store}>
        <BrowserRouter>
          <PokemonCard
            image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            name="Bulbasaur"
            id={1}
            type={['grass', 'poison']}
          ></PokemonCard>
        </BrowserRouter>
      </reactRedux.Provider>,
    );

    const card = screen.getByRole('button', {
      name: /bulbasaur/i,
    });
    fireEvent.click(card);

    await screen.findByText(/bulbasaur/i);
    screen.findByText(/Hp/i);
    screen.findByText(/Attack/i);
  });
});
