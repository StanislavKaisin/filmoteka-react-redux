import { moviesPerPageDefaultServerResponse } from "../../apiAttributes/apiAttributes";

export const getPagesCount = (
  moviesListLength: number,
  pagesSet: number = moviesPerPageDefaultServerResponse
): number => {
  return Math.floor(moviesListLength / pagesSet) -
    moviesListLength / pagesSet ===
    0
    ? Math.floor(moviesListLength / pagesSet)
    : Math.floor(moviesListLength / pagesSet) + 1;
};
