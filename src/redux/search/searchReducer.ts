import { SEARCH_MOVIE } from "./searchTypes";

const initialSearchState = { searchRequest: "" };

export interface IsearchAction {
  type: typeof SEARCH_MOVIE;
  payload: string;
}

export const searchReducer = (
  state = initialSearchState,
  action: IsearchAction
) => {
  switch (action.type) {
    case SEARCH_MOVIE:
      return { ...state, searchRequest: action.payload };
    default:
      return state;
  }
};
