import axios from "axios";
import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  apiKey,
  page,
  url,
  urlForCertainMovieFetch,
} from "../apiAttributes/apiAttributes";
import { ICard } from "../interfaces/ICard";
import IMovie from "../interfaces/IMovie";
import { SET_CURRENT_PAGE } from "./currentPage/pagesResultsTypes";
import { hideError, showError } from "./error/errorActions";
import { SHOW_ERROR } from "./error/errorTypes";
import { IfetchMovieAction } from "./fetchMovie/fetchMovieActions";
import { FETCH_MOVIE } from "./fetchMovie/fetchMovieTypes";
import { hideLoader, showLoader } from "./loader/loaderActions";
import { LOAD_MOVIE } from "./loadMovie/loadMovieTypes";
import { IState } from "./rootReducer";
import { SEARCH_MOVIE } from "./search/searchTypes";
import { FETCHED_MOVIES } from "./searchResults/searchResultsTypes";

export function* sagaWatcher() {
  yield takeEvery(SEARCH_MOVIE, sagaWorker);
  yield takeEvery(SET_CURRENT_PAGE, sagaWorker);
  yield takeEvery(FETCH_MOVIE, sagaMovieWorker);
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function* sagaWorker(action: any) {
  let currentPage = null;
  let searchRequest = null;
  const state: IState = yield select();
  if (action.type === SEARCH_MOVIE) {
    currentPage = 1;
    searchRequest = action.payload;
  }
  if (action.type === SET_CURRENT_PAGE) {
    currentPage = action.payload.currentPage;
    searchRequest = state.search.searchRequest;
  }
  yield put(hideLoader());
  try {
    yield put(showLoader());
    const results: ICard[] = yield call(
      fetchMovies,
      searchRequest,
      currentPage
    );
    yield put({ type: FETCHED_MOVIES, payload: results });
    yield put(hideLoader());
  } catch (error) {
    const results = { results: [], totalResults: 0 };
    yield put({ type: FETCHED_MOVIES, payload: results });
    yield put({ type: SHOW_ERROR, payload: error.message });
    yield delay(4000);
    yield put({ type: SEARCH_MOVIE, payload: "" });
    yield put({ type: SET_CURRENT_PAGE, payload: 1 });
    yield put(hideError());
    yield put(hideLoader());
  }
}

function* sagaMovieWorker(action: IfetchMovieAction) {
  try {
    yield put(showLoader());
    const movieId = action.payload;
    const result: IMovie[] = yield call(fetchMovie, movieId);
    yield put({ type: LOAD_MOVIE, payload: result });
    yield put(hideLoader());
  } catch (error) {
    const result = null;
    yield put({ type: LOAD_MOVIE, payload: result });
    yield put({ type: SHOW_ERROR, payload: error.message });
    yield delay(4000);
    yield put(hideError());
    yield put(hideLoader());
  }
}

const fetchMovies = async (search: string, pageNum: number = 1) => {
  if (!search && !pageNum) return new Error("Wrong search params!");
  if (!search.trim() || !search) return;
  return await axios
    .get(url + search + page + pageNum + apiKey)
    .then((data) => {
      if (data.data.Error) {
        throw Error(data.data.Error);
      }
      if (data.data.Error) {
        return {
          results: [],
          totalResults: 0,
        };
      }
      return {
        results: data.data.Search,
        totalResults: data.data.totalResults,
      };
    });
};

// const url = "https://www.omdbapi.com/?i=";
// const apiKey = "&apikey=4095ed63";
// const full = "";
//?imdbID=tt0094432

const fetchMovie = async (imdbID: string): Promise<IMovie | null> => {
  if (!imdbID.trim() || !imdbID) return null;
  return await axios
    .get(urlForCertainMovieFetch + imdbID + apiKey)
    .then((data) => {
      return data.data;
    });
};
