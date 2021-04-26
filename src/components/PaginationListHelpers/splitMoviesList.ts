import { moviesPerPageDefaultServerResponse } from "../../apiAttributes/apiAttributes";
import { ICard } from "../../interfaces/ICard";

export const splitMoviesList = (
  moviesList: ICard[],
  pagesCount: number,
  pagesSet: number = moviesPerPageDefaultServerResponse
) => {
  let result = [];
  let startIndex = 0;
  for (let index = 1; index <= pagesCount; index++) {
    result.push(moviesList.slice(startIndex, startIndex + pagesSet));
    startIndex = startIndex + pagesSet;
  }
  return result;
};
