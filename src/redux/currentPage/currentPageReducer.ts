import { IcurrentPageAction } from "./currentPageActions";
import { SET_CURRENT_PAGE } from "./pagesResultsTypes";

const initialPagesResultsReducerState = { currentPage: 1 };

export const currentPageReducer = (
  state = initialPagesResultsReducerState,
  action: IcurrentPageAction
) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
