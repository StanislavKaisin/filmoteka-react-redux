import { ICard } from "../../interfaces/ICard";
import { ADD_TO_LIBRARY, REMOVE_FROM_LIBRARY } from "./libraryTypes";

export function addToLibrary(library: string, movie: ICard): ILibraryAction {
  return {
    type: ADD_TO_LIBRARY,
    payload: {
      library,
      movie,
    },
  };
}

export function removeFromLibrary(
  library: string,
  movie: ICard
): ILibraryAction {
  return {
    type: REMOVE_FROM_LIBRARY,
    payload: {
      library,
      movie,
    },
  };
}

export interface ILibraryAction {
  type: typeof ADD_TO_LIBRARY | typeof REMOVE_FROM_LIBRARY;
  payload: {
    library: string;
    movie: ICard;
  };
}
