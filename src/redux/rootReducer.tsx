import { combineReducers } from "redux";
import { currentPageReducer } from "./currentPage/currentPageReducer";
import { errorReducer } from "./error/errorReducer";
import { fetchMovieReducer } from "./fetchMovie/fetchMovieReducer";
import { loaderReducer } from "./loader/loaderReducer";
import { loadMovieReducer } from "./loadMovie/loadMovieReducer";
import { searchReducer } from "./search/searchReducer";
import { searchResultsReducer } from "./searchResults/searchResultsReducer";
import { libraryReducer } from "./library/libraryReducer";

export const rootReducer = combineReducers({
  search: searchReducer,
  searchResults: searchResultsReducer,
  currentPage: currentPageReducer,
  fetchMovie: fetchMovieReducer,
  loader: loaderReducer,
  error: errorReducer,
  movie: loadMovieReducer,
  library: libraryReducer,
});

export type IState = ReturnType<typeof rootReducer>;
