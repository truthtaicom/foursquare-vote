import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Home from './Home';

afterEach(cleanup);

describe('<Home> specs', () => {
  test('can search with title', () => {
    const getIncidentsMock = jest.fn();
    const paramsMock = {
      client_id: 'GACECA3P0EWPIICCVKEDZ2PHBOPXO51D0LE2Z2OEQOHGXHGW',
      client_secret: 'ZN4ZJD0DPCX011MGO0JOK0Y4Z4OVP5XPI2ND4LCE11BZCZGQ',
      limit: 3,
      near: 'Bi',
      query: 'lunch',
      v: 20170801
    };
    const { getByText, getByPlaceholderText } = render(
      <Home searchVenues={getIncidentsMock} />
    );

    const titleNode = getByPlaceholderText(/Place/i);
    const submitNode = getByText(/Search/i);

    titleNode.value = 'Bi';

    fireEvent.click(submitNode);

    expect(getIncidentsMock).toHaveBeenCalled();
    expect(getIncidentsMock).toHaveBeenCalledWith(paramsMock);
  });
});
