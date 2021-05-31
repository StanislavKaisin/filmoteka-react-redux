import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICard } from "../interfaces/ICard";
import {
  addToLibrary,
  removeFromLibrary,
} from "../redux/library/libraryActions";
import { ELibrary } from "../redux/library/libraryTypes";
import { IState } from "../redux/rootReducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    barButton: {
      textAlign: "center",
      minHeight: "4rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: ".6rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "default",
      },
    },
  })
);

export interface ILibraryButtonProps {
  libraryName: string;
  movieCard: ICard;
}

export const LibraryButton = ({
  libraryName,
  movieCard,
}: ILibraryButtonProps) => {
  // console.log("libraryName=", libraryName);
  const styles = useStyles();
  let library = useSelector((state: IState) => state.library[libraryName]);
  console.log("libraryName in button=", libraryName);
  console.log("library=", library);
  console.log("library in button=", library);
  let isInLibraryInitialState = !!library.find(
    (movie) => movie.imdbID === movieCard.imdbID
  );
  const [isInLibrary, setisInLibrary] = useState<boolean>(
    isInLibraryInitialState
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("click");

    // console.log("collection=", collection);
    // console.log("isInLibrary=", isInLibrary);

    // switch (collection) {
    //   case ELibrary[0]:
    !isInLibrary
      ? dispatch(addToLibrary(libraryName, movieCard))
      : dispatch(removeFromLibrary(libraryName, movieCard));
    setisInLibrary(!isInLibrary);
    // if (action === ADD_TO_LIBRARY) {
    //   dispatch(addToLibrary(collection, movieCard));
    // }
    // if (action === REMOVE_FROM_LIBRARY) {
    //   dispatch(removeFromLibrary(collection, movieCard));
    // }
    //     setisWatched(!isWatched);
    //     break;
    //   default:
    //     break;
    // }
  };
  return (
    <Button
      className={styles.barButton}
      variant="outlined"
      size="small"
      fullWidth={true}
      onClick={handleClick}
    >
      {!isInLibrary ? "Add to" : "Remove from"}
      {/* Add to */}
      {/* Remove from */}
      <br />
      {/* watched */}
      {libraryName}
    </Button>
  );
};
