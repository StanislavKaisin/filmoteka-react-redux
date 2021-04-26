import { combineReducers } from "redux";
import { currentPageReducer } from "./currentPage/currentPageReducer";
import { errorReducer } from "./error/errorReducer";
import { fetchMovieReducer } from "./fetchMovie/fetchMovieReducer";
import { loaderReducer } from "./loader/loaderReducer";
import { loadMovieReducer } from "./loadMovie/loadMovieReducer";
import { searchReducer } from "./search/searchReducer";
import { searchResultsReducer } from "./searchResults/searchResultsReducer";

export const rootReducer = combineReducers({
  search: searchReducer,
  searchResults: searchResultsReducer,
  currentPage: currentPageReducer,
  fetchMovie: fetchMovieReducer,
  // fetchedPosts: fetchPostsReducer,
  loader: loaderReducer,
  error: errorReducer,
  movie: loadMovieReducer,
  // alert: alertReducer,
});

export type IState = ReturnType<typeof rootReducer>;
