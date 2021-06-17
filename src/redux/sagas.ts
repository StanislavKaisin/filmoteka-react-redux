import axios from "axios";
// import { useSelector } from "react-redux";
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
import { IsearchAction } from "./search/searchReducer";
// import { IState } from "./rootReducer";
// import { IsearchAction } from "./search/searchReducer";
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
    // yield put({ type: SET_CURRENT_PAGE, payload: 1 });
    currentPage = 1;
    searchRequest = action.payload;
  }
  // else {
  //   console.log(`action`, action);
  // }
  if (action.type === SET_CURRENT_PAGE) {
    // yield put({ type: SET_CURRENT_PAGE, payload: 1 });
    // console.log(`action`, action);
    currentPage = action.payload.currentPage;
    searchRequest = state.search.searchRequest;
  }
  // yield console.log(`searchRequest`, searchRequest);
  // yield console.log(`currentPage`, currentPage);

  // yield delay(2000);
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
    // yield put(showError(error));
    yield delay(4000);
    yield put({ type: SEARCH_MOVIE, payload: "" });
    yield put({ type: SET_CURRENT_PAGE, payload: 1 });
    yield put(hideError());
    yield put(hideLoader());
    // yield put(hideAlert());
    // console.log(`error`, error);
  }
}

function* sagaMovieWorker(action: IfetchMovieAction) {
  try {
    yield put(showLoader());
    const movieId = action.payload;
    const result: IMovie[] = yield call(fetchMovie, movieId);
    // console.log(`result`, result);
    yield put({ type: LOAD_MOVIE, payload: result });
    yield put(hideLoader());
  } catch (error) {
    const result = null;
    yield put({ type: LOAD_MOVIE, payload: result });
    yield put({ type: SHOW_ERROR, payload: error.message });
    // yield put(showError(error));
    yield delay(4000);
    yield put(hideError());
    yield put(hideLoader());
    // yield put(hideAlert());
    // console.log(`error`, error);
  }
}

// search: string, pageNum = ""

// eslint-disable-next-line react-hooks/rules-of-hooks
// const search = useSelector((state: IState) => state.search);
// const pageNum = "";
const fetchMovies = async (search: string, pageNum: number = 1) => {
  if (!search && !pageNum) return new Error("Wrong search params!");
  // console.log(`search`, search);
  if (!search.trim() || !search) return;
  return await axios
    .get(url + search + page + pageNum + apiKey)
    .then((data) => {
      // console.log(`data`, data);
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
  // const url = "https://www.omdbapi.com/?i=";
  if (!imdbID.trim() || !imdbID) return null;
  return await axios
    .get(urlForCertainMovieFetch + imdbID + apiKey)
    .then((data) => {
      // console.log(`data`, data);
      return data.data;
    });
};
