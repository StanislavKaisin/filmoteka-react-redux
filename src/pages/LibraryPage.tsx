import React, { useState } from "react";
// import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { AppBar, Box, Grid, Typography } from "@material-ui/core";
// import SwipeableViews from "react-swipeable-views";

// import mockList from "../mockData/mockList.json";
// import { ICard } from "../interfaces/ICard";
// import { PaginationList } from "../components/PaginationList";
import { useSelector } from "react-redux";
import { IState } from "../redux/rootReducer";
import { ELibrary } from "../redux/library/libraryTypes";
import { ICard } from "../interfaces/ICard";
import { PaginationLibraryList } from "../components/PaginationLibraryList";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    [theme.breakpoints.up("sm")]: { width: "80%" },
    [theme.breakpoints.up("md")]: { width: "65%" },
  },
  library: {
    paddingTop: "1rem",
  },
  message: {
    margin: "1rem",
    color: "rgba(0, 0, 0, 0.54)",
    textTransform: "uppercase",
    textAlign: "center",
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface ILibraryLists {
  [key: string]: ICard[];
}

export const LibraryPage = () => {
  // console.log("mockList.Search", mockList.Search);
  const classes = useStyles();
  const theme = useTheme();
  const state = useSelector((state: IState) => state);
  const planned = state.library[ELibrary[0]];
  const watched = state.library[ELibrary[1]];
  const favorites = state.library[ELibrary[2]];
  const [value, setValue] = React.useState(0);

  // const libraryLists = [
  //   { planned: planned, pagesCount: Math.ceil(planned.length / 10) },
  //   { watched: watched, pagesCount: Math.ceil(watched.length / 10) },
  //   { favorites: favorites, pagesCount: Math.ceil(favorites.length / 10) },
  // ];
  const libraryLists = [planned, watched, favorites];

  // console.log("value", value);
  // console.log("lists[value]=", lists[value]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.library}
      >
        <div className={classes.root}>
          {/* <Paper square> */}
          <AppBar position="static" color="transparent" elevation={0}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab
                label="PLANNED"
                icon={<WatchLaterIcon />}
                {...a11yProps(0)}
              />
              <Tab
                label="WATCHED"
                icon={<VisibilityIcon />}
                {...a11yProps(1)}
              />
              <Tab
                label="FAVORITES"
                icon={<FavoriteIcon />}
                {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>
          {/* <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          > */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            {libraryLists[0].length ? (
              <PaginationLibraryList
                moviesList={libraryLists[0]}
                pagesCount={Math.ceil(libraryLists[0].length / 10)}
              />
            ) : (
              <Typography className={classes.message}>Nothing here</Typography>
            )}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {libraryLists[1].length ? (
              <PaginationLibraryList
                moviesList={libraryLists[1]}
                pagesCount={Math.ceil(libraryLists[1].length / 10)}
              />
            ) : (
              <Typography className={classes.message}>Nothing here</Typography>
            )}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {libraryLists[2].length ? (
              <PaginationLibraryList
                moviesList={libraryLists[2]}
                pagesCount={Math.ceil(libraryLists[2].length / 10)}
              />
            ) : (
              <Typography className={classes.message}>Nothing here</Typography>
            )}
          </TabPanel>
        </div>
      </Grid>
    </>
  );
};
