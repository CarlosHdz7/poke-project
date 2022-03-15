import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import AppRouter from 'views/AppRouter';
import BookmarksView from '.';
import bookmarksMock from 'mocks/bookmarksMock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('Testing bookmarks page', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const middlewares: any = [thunk];
  const mockStore = configureStore(middlewares);
  const initialState = {
    bookmarks: bookmarksMock,
  };
  const store = mockStore(initialState);

  store.dispatch = jest.fn();

  it('should render saved bookmars', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BookmarksView />
          <AppRouter />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByRole('heading', { name: 'Bookmarks' })).not.toBeNull();
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
  });

  it('should show no results message', async () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
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
