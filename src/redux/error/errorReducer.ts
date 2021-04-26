import { IerrorAction } from "./errorActions";
import { HIDE_ERROR, SHOW_ERROR } from "./errorTypes";

const initialErrorState = { error: "" };

export interface IinitialErrorState {
  error: string;
}

export const errorReducer = (
  state: IinitialErrorState = initialErrorState,
  action: IerrorAction
): {
  error: string;
} => {
  switch (action.type) {
    case SHOW_ERROR:
      return { ...state, error: action.payload };
    case HIDE_ERROR:
      return { ...state, error: "" };
    default:
      return state;
  }
};
