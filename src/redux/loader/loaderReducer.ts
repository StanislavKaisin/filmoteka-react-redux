import { IloaderAction } from "./loaderActions";
import { HIDE_LOADER, SHOW_LOADER } from "./loaderTypes";

const initialLoaderState = { loading: false };

export const loaderReducer = (
  state = initialLoaderState,
  action: IloaderAction
) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};
