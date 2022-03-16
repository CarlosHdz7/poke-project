import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from 'store';
import AppRouter from 'views/AppRouter';
import bookmarksMock from 'mocks/bookmarksMock';
import userEvent from '@testing-library/user-event';

describe('Testing Pokemon Detail view', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should shows pokemon details with filled heart', async () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
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
      const icon = document.querySelector('.bi-heart-fill');
      expect(icon).toBeInTheDocument();
    });
  });

  it('should shows pokemon details without filled heart', async () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    useSelectorMock.mockReturnValue(bookmarksMock);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemons/2']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/Name: Ivysaur/i)).toBeInTheDocument();
      expect(screen.queryByText('Attack')).toBeInTheDocument();
      expect(screen.queryByText('Defense')).toBeInTheDocument();
      const icon = document.querySelector('.bi-heart');
      expect(icon).toBeInTheDocument();
    });
  });

  it('should go back to previous page (Pokemons List)', async () => {
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

    userEvent.click(icon);

    await waitFor(() => {
      expect(screen.queryByText(/Pokemons List/i)).toBeInTheDocument();
      expect(screen.queryByText(/Bulbasaur/i)).toBeInTheDocument();
      expect(screen.queryByText(/Raticate/i)).toBeInTheDocument();
    });
  });

  it('should redirect to 404', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemons/error']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('Pokemon not found')).toBeInTheDocument();
  });

  it('should add/remove bookmark', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemons/2']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/Name: Ivysaur/i)).toBeInTheDocument();
    });

    const iconAdd = container.querySelector('.bi-heart') as Element;
    userEvent.click(iconAdd);

    await waitFor(() => {
      const iconRemove = container.querySelector('.bi-heart-fill') as Element;
      expect(iconRemove).toBeInTheDocument();
    });

    const iconAdd2 = container.querySelector('.bi-heart-fill') as Element;
    userEvent.click(iconAdd2);

    await waitFor(() => {
      const iconAdd2 = container.querySelector('.bi-heart') as Element;
      expect(iconAdd2).toBeInTheDocument();
    });
  });
});
