import { takeLatest, put, call } from 'redux-saga/effects';
import { SEARCH_VENUES_REQUEST } from './Home.actionTypes';
import { searchVenuesSuccess, searchVenuesFailure } from './Home.action';
import { searchVenues } from '../../shared/services/venues';

export const searchVenuesAction = function*(action: any) {
  try {
    const data = yield call(searchVenues, action.params);
    yield put(searchVenuesSuccess(data.response.venues));
  } catch (e) {
    yield put(searchVenuesFailure(e));
  }
};

export const homeSaga = function*() {
  yield takeLatest(SEARCH_VENUES_REQUEST, searchVenuesAction);
};
