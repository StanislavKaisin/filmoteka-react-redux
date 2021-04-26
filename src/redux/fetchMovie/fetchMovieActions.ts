import { FETCH_MOVIE } from "./fetchMovieTypes";

export function fetchMovie(movieId: string): IfetchMovieAction {
  return {
    type: FETCH_MOVIE,
    payload: movieId,
  };
}

export interface IfetchMovieAction {
  type: typeof FETCH_MOVIE;
  payload: string;
}
