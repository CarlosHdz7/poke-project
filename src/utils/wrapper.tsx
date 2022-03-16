/* eslint-disable react/react-in-jsx-scope */
import { ReactElement } from 'react';

import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import AppRouter from 'views/AppRouter';

const renderWithBrowseRouter = (component: ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>,
  );
};

const renderWithMemoryRouter = (path: string[] = ['/']) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={path}>
        <AppRouter />
      </MemoryRouter>
    </Provider>,
  );
};

export { renderWithBrowseRouter, renderWithMemoryRouter };
