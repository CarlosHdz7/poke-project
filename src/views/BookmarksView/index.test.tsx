import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import store from 'store';
import Error404 from '.';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import AppRouter from 'views/AppRouter';
import BookmarksView from '.';
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

describe('Testing bookmarks page', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

  beforeEach(() => useSelectorMock.mockClear());

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

    // screen.debug();
  });
});
