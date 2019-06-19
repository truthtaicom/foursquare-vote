import { homeReducer } from './Home.reducer';
import * as types from './Home.actionTypes';

describe('reducer', () => {
  it('should create an reducer to search with request status', () => {
    const expected = {
      request: true,
      data: [],
      error: null
    };

    const result = homeReducer(undefined, {
      type: types.SEARCH_VENUES_REQUEST
    });
    expect(result).toEqual(expected);
  });

  it('should create an reducer to search with success status', () => {
    const expected = {
      request: false,
      data: [{ a: 1 }],
      error: null
    };

    const result = homeReducer(undefined, {
      type: types.SEARCH_VENUES_SUCCESS,
      data: [{ a: 1 }]
    });
    expect(result).toEqual(expected);
  });

  it('should create an reducer to search with failure status', () => {
    const expected = {
      request: false,
      data: null,
      error: new Error()
    };

    const result = homeReducer(undefined, {
      type: types.SEARCH_VENUES_FAILURE,
      error: new Error()
    });
    expect(result).toEqual(expected);
  });
});
