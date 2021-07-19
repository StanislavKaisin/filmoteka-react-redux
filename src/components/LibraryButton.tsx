import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
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
  const styles = useStyles();
  let library = useSelector((state: IState) => state.library[libraryName]);
  console.log("state in button=", library);
  console.log("libraryName in button=", libraryName);
  console.log("library=", library);

  const tryToFind = library.find(
    (movie) => movie.imdbID === movieCard.imdbID
  );
  let isInLibrary = (tryToFind === undefined) ? false : !!tryToFind;
  const dispatch = useDispatch();
  const handleClick = () => {
    !isInLibrary
      ? dispatch(addToLibrary(libraryName, movieCard))
      : dispatch(removeFromLibrary(libraryName, movieCard));
  };
  return (
    <Button
      className={styles.barButton}
      variant="outlined"
      size="small"
      fullWidth={true}
      onClick={handleClick}
    >
      {isInLibrary ? "Remove from" : "Add to"}
      <br />
      {libraryName}
    </Button>
  );
};
