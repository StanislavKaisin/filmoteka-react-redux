import { HIDE_ERROR, SHOW_ERROR } from "./errorTypes";

export function showError(errorMessage: string): IerrorAction {
  return {
    type: SHOW_ERROR,
    payload: errorMessage,
  };
}

export function hideError(): IerrorAction {
  return {
    type: HIDE_ERROR,
    payload: "",
  };
}

export interface IerrorAction {
  type: typeof SHOW_ERROR | typeof HIDE_ERROR;
  payload: string;
}
