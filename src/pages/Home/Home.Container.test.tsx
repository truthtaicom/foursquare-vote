import React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import HomeContainer from './Home.Container';
import { homeReducer } from './Home.reducer';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(cleanup);

function renderWithRedux(
  ui,
  {
    initialState = { homeReducer: {} },
    store = createStore(homeReducer, initialState)
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <Router>{ui}</Router>
      </Provider>
    ),
    store
  };
}

test('can render with redux with data with empty', async () => {
  const { container, getByText } = renderWithRedux(<HomeContainer />, {
    initialState: {
      homeReducer: {
        data: []
      }
    }
  });

  const emptyTextNode = getByText('Not found !');

  expect(emptyTextNode).toBeTruthy();
});

test('can render with redux with data with error', async () => {
  const { container, getByText } = renderWithRedux(<HomeContainer />, {
    initialState: {
      homeReducer: {
        data: [],
        request: false,
        error: {
          message: 'ERROR !'
        }
      }
    }
  });

  const errorTextNode = getByText('ERROR !');

  expect(errorTextNode).toBeTruthy();
});
