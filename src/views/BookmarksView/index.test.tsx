import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import store from 'store';
import AppRouter from 'views/AppRouter';
import { IBookmark } from 'interfaces/IBookmark';
import BookmarksView from '.';

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
  {
    uid: 1,
    pokemon :     {
      "id": 1,
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      "stats": [
        {
          "name": "Hp",
          "base": 45
        },
        {
          "name": "Attack",
          "base": 49
        },
        {
          "name": "Defense",
          "base": 49
        },
        {
          "name": "Special-Attack",
          "base": 65
        },
        {
          "name": "Special-Defense",
          "base": 65
        },
        {
          "name": "Speed",
          "base": 45
        }
      ],
      "type": ["grass", "poison"]
    },
  }
];

describe('Testing bookmarks page', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it('should render saved bookmars', async () => {
    useSelectorMock.mockReturnValue(bookmarksMock);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BookmarksView />
          <AppRouter />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByRole('heading', { name: 'Bookmarks' })).not.toBeNull();
    expect(screen.getByText(/Pikachu/i)).not.toBeNull();
    expect(screen.getByText(/Bulbasaur/i)).not.toBeNull();
  });

  it('should delete a bookmark', async () => {
    const dispatchMock = jest.fn(jest.fn());
    useSelectorMock.mockReturnValue(bookmarksMock);
    useDispatchMock.mockReturnValue(dispatchMock);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BookmarksView />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Bulbasaur/i)).not.toBeNull();
    const deleteButtons = screen.getAllByRole('button');
    fireEvent.click(deleteButtons[0]);
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('should show no results message', async () => {
    useSelectorMock.mockReturnValue([]);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BookmarksView />
          <AppRouter />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/No results/i)).not.toBeNull();
  });
});
