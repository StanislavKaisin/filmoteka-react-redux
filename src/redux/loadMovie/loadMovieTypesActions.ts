import IMovie from "../../interfaces/IMovie";
import { LOAD_MOVIE } from "./loadMovieTypes";

export function loadMovie(movie: IMovie): IloadMovieAction {
  return {
    type: LOAD_MOVIE,
    payload: movie,
  };
}

export interface IloadMovieAction {
  type: typeof LOAD_MOVIE;
  payload: IMovie | null;
}
