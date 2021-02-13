import React from "react";
import {
  createStyles,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

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
  return (
    <>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search Movie"
          inputProps={{ "aria-label": "Search Movie" }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon fontSize="large" />
        </IconButton>
      </Paper>
    </>
  );
};
