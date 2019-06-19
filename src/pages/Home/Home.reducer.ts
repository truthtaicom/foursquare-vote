import {
  SEARCH_VENUES_REQUEST,
  SEARCH_VENUES_SUCCESS,
  SEARCH_VENUES_FAILURE
} from './Home.actionTypes';

export interface IHomeState {
  request: boolean;
  data: any;
  error: typeof Error | null;
}

export const initialState: IHomeState = {
  request: false,
  data: null,
  error: null
};

export function homeReducer(state = initialState, action: any) {
  switch (action.type) {
    case SEARCH_VENUES_REQUEST:
      return {
        ...state,
        request: true,
        error: null,
        data: []
      };
    case SEARCH_VENUES_SUCCESS:
      return {
        ...state,
        request: false,
        data: action.data
      };

    case SEARCH_VENUES_FAILURE:
      return {
        ...state,
        request: false,
        error: action.error
      };

    default:
      return state;
  }
}
