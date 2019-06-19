import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table';
import { data } from './data';

describe('<Table /> spec', () => {
  it('renders the component', () => {
    const component = render(<Table data={data.response.venues} />);
    expect(component).toMatchSnapshot();
  });
});
