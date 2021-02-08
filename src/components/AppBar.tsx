import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";

import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import HomeIcon from "@material-ui/icons/Home";

import { Link } from "react-router-dom";

import React from "react";

const useStyles = makeStyles({
  root: {
    justifyContent: "space-around",
  },
  button: {
    maxWidth: "none",
    minWidth: "none",
  },
});

export const ApplicationBar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Home"
          icon={<HomeIcon fontSize="large" />}
          className={classes.button}
        />
        <BottomNavigationAction
          component={Link}
          to="/library"
          label="Library"
          icon={<LocalLibraryIcon fontSize="large" />}
          className={classes.button}
        />
      </BottomNavigation>
    </>
  );
};
