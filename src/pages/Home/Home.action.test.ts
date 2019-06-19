import * as actions from './Home.action';
import * as types from './Home.actionTypes';

describe('actions', () => {
  it('should create an action to search venue with request status', () => {
    const text = 'Finish docs';
    const expectedAction = {
      type: types.SEARCH_VENUES_REQUEST,
      params: { a: 1 }
    };
    expect(actions.searchVenuesRequest({ a: 1 })).toEqual(expectedAction);
  });

  it('should create an action to search venue with request success', () => {
    const text = [{ a: 'b' }];
    const expectedAction = {
      type: types.SEARCH_VENUES_SUCCESS,
      data: text
    };
    expect(actions.searchVenuesSuccess(text)).toEqual(expectedAction);
  });

  it('should create an action to search venue with request failure', () => {
    const text = 'error';
    const expectedAction = {
      type: types.SEARCH_VENUES_FAILURE,
      error: text
    };
    expect(actions.searchVenuesFailure(text)).toEqual(expectedAction);
  });
});
