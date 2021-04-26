import { Reducer } from "redux";
import IMovie from "../../interfaces/IMovie";
import { LOAD_MOVIE } from "./loadMovieTypes";
import { IloadMovieAction } from "./loadMovieTypesActions";

const initialLoadMovieState = { movie: null };

export interface IloadMovie {
  movie: IMovie | null;
}

export const loadMovieReducer: Reducer<IloadMovie, IloadMovieAction> = (
  state = initialLoadMovieState,
  action: IloadMovieAction
) => {
  switch (action.type) {
    case LOAD_MOVIE:
      return { ...state, ...{ movie: action.payload } };
    default:
      return state;
  }
};
