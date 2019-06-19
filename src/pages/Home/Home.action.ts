import {
  SEARCH_VENUES_REQUEST,
  SEARCH_VENUES_SUCCESS,
  SEARCH_VENUES_FAILURE,
  ISearchVenuesRequestAction,
  ISearchVenuesSuccessAction,
  ISearchVenuesFailureAction
} from './Home.actionTypes';

export function searchVenuesRequest(params: any): ISearchVenuesRequestAction {
  return {
    type: SEARCH_VENUES_REQUEST,
    params
  };
}

export function searchVenuesSuccess(data: any): ISearchVenuesSuccessAction {
  return {
    type: SEARCH_VENUES_SUCCESS,
    data
  };
}

export function searchVenuesFailure(error: any): ISearchVenuesFailureAction {
  return {
    type: SEARCH_VENUES_FAILURE,
    error
  };
}
