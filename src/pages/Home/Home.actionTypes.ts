// import { IVenue } from '../../shared/components/Venue/Venue';

export const SEARCH_VENUES_REQUEST = 'SEARCH_VENUES_REQUEST';
export const SEARCH_VENUES_SUCCESS = 'SEARCH_VENUES_SUCCESS';
export const SEARCH_VENUES_FAILURE = 'SEARCH_VENUES_FAILURE';

export interface ISearchVenuesRequestAction {
  type: typeof SEARCH_VENUES_REQUEST;
  params: any;
}

export interface ISearchVenuesSuccessAction {
  type: typeof SEARCH_VENUES_SUCCESS;
  data: any;
}

export interface ISearchVenuesFailureAction {
  type: typeof SEARCH_VENUES_FAILURE;
  error?: typeof Error;
}
