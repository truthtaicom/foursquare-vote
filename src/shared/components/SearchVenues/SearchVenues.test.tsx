import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FormItem from './SearchVenues';

describe('<SearchVenues /> spec', () => {
  it('calls "onSubmit" prop on button click', () => {
    const mockData = { query: 'Bi' };
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <FormItem onSubmit={onSubmit} />
    );

    const titleNode = getByPlaceholderText(/Place/i);
    const submitButtonNode = getByText(/Search/i);

    titleNode.value = 'Bi';

    fireEvent.click(submitButtonNode);
    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(mockData, expect.any(Function));
  });
});
