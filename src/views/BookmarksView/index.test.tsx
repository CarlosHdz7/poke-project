import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import store from 'store';
import AppRouter from 'views/AppRouter';
import BookmarksView from '.';
import bookmarksMock from 'mocks/bookmarksMock';

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
