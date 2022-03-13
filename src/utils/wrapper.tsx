/* eslint-disable react/react-in-jsx-scope */
import { ReactElement } from 'react';

import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import AppRouter from 'views/AppRouter';

const renderWithBrowseRouter = (ui: ReactElement, withRouter: boolean = false) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
        {withRouter && <AppRouter />}
      </BrowserRouter>
    </Provider>,
  );
};

const renderWithMemoryRouter = (ui: ReactElement, path: string[] = ['/'], withRouter: boolean = false) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={path}>
        {ui}
        {withRouter && <AppRouter />}
      </MemoryRouter>
    </Provider>,
  );
};

export { renderWithBrowseRouter, renderWithMemoryRouter };
