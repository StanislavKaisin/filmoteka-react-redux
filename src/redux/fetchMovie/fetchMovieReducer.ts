import IMovie from "../../interfaces/IMovie";
import { FETCH_MOVIE } from "./fetchMovieTypes";

export interface IfetchMovieAction {
  type: typeof FETCH_MOVIE;
  payload: { fetchedMovie: IMovie };
}

export const fetchMovieReducer = (
  state = initialFetchMovieReducerState,
  action: IfetchMovieAction
) => {
  switch (action.type) {
    case FETCH_MOVIE:
      return { ...state, fetchedMovie: action.payload };
    default:
      return state;
  }
};

const initialFetchMovieReducerState = {
  fetchedMovie: null,
};
