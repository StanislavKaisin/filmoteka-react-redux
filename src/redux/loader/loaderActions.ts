import { HIDE_LOADER, SHOW_LOADER } from "./loaderTypes";

export function showLoader(): IloaderAction {
  return {
    type: SHOW_LOADER,
  };
}

export function hideLoader(): IloaderAction {
  return {
    type: HIDE_LOADER,
  };
}

export interface IloaderAction {
  type: typeof SHOW_LOADER | typeof HIDE_LOADER;
}
