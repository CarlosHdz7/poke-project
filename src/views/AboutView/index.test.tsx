import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import renderer from 'react-test-renderer';
import AboutView from '.';

describe('Testing About page', () => {
  it('should render correctly', async () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <AboutView />
          </BrowserRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
