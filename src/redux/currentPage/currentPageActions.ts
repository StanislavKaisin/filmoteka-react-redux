import { SET_CURRENT_PAGE } from "./pagesResultsTypes";

export interface IcurrentPageAction {
  type: typeof SET_CURRENT_PAGE;
  payload: { currentPage: number };
}

export function setCurrentPage(currentPage: number): IcurrentPageAction {
  return {
    type: SET_CURRENT_PAGE,
    payload: { currentPage },
  };
}
