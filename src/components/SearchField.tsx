import React, { useRef, useState } from "react";
import {
  createStyles,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { SEARCH_MOVIE } from "../redux/search/searchTypes";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 300,
    },
    input: {
      marginLeft: theme.spacing(1),
      fontSize: "1.1rem",
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

export const SearchField = () => {
  const classes = useStyles();
  const [search, setsearch] = useState("");
  const dispatch = useDispatch();
  const searchField = useRef<HTMLInputElement>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setsearch(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!search.trim()) return;
    dispatch({ type: SEARCH_MOVIE, payload: search.trim() });
    setsearch("");
    searchField.current!.value = "";
    // console.log(`event`, event.target);
    // console.log(`searchField.current?.value`, searchField.current?.value);
  };

  return (
    <>
      <Paper
        component="form"
        className={classes.root}
        onSubmit={(e) => handleSubmit(e)}
      >
        <InputBase
          className={classes.input}
          placeholder="Search Movie"
          inputProps={{ "aria-label": "Search Movie" }}
          name="search"
          onChange={handleChange}
          // ref={searchField}
          inputRef={searchField}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon fontSize="large" />
        </IconButton>
      </Paper>{" "}
    </>
  );
};
