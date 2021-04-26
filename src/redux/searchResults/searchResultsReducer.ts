import { ICard } from "../../interfaces/ICard";
import { FETCHED_MOVIES } from "./searchResultsTypes";

const initialSearchState = { results: [], totalResults: 0 };

export interface IsearchResultsAction {
  type: typeof FETCHED_MOVIES;
  payload: ICard[];
}

export const searchResultsReducer = (
  state = initialSearchState,
  action: IsearchResultsAction
) => {
  switch (action.type) {
    case FETCHED_MOVIES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
