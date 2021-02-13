import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";

import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import HomeIcon from "@material-ui/icons/Home";

import { Link, useHistory } from "react-router-dom";

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
  const history = useHistory();
  let initialNavigationState;
  switch (true) {
    case history.location.pathname === "/":
      initialNavigationState = 0;
      break;
    case history.location.pathname === "/library":
      initialNavigationState = 1;
      break;
    default:
      initialNavigationState = 100;
      break;
  }
  const classes = useStyles();
  const [value, setValue] = React.useState(initialNavigationState);
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
