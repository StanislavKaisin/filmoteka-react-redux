import { Reducer } from "redux";
import { ICard } from "../../interfaces/ICard";
import { ILibraryAction } from "./libraryActions";
import { ADD_TO_LIBRARY, REMOVE_FROM_LIBRARY } from "./libraryTypes";

export interface ILibrary {
  [key: string]: ICard[];
}

const libraryInitialState: ILibrary = {
  watched: [],
  planned: [],
  favorite: [],
};

// console.log(libraryInitialState);

export const libraryReducer: Reducer<ILibrary, ILibraryAction> = (
  state = libraryInitialState,
  action: ILibraryAction
): ILibrary => {
  switch (action.type) {
    case ADD_TO_LIBRARY:
      const library = action.payload.library;
      if (
        state[action.payload.library].find(
          (movie) => movie.imdbID === action.payload.movie.imdbID
        )
      )
        return state;

      // console.log(`state`, state);
      const newState = { ...state };
      newState[library] = [...newState[library], ...[action.payload.movie]];
      return { ...state, ...newState };

    case REMOVE_FROM_LIBRARY:
      const newStateToRemove = { ...state };
      newStateToRemove[action.payload.library] = newStateToRemove[
        action.payload.library
      ].filter((movie: ICard) => movie.imdbID !== action.payload.movie.imdbID);
      return { ...newStateToRemove };

    default:
      return state;
  }
};
