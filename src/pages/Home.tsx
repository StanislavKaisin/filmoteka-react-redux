import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

import React from "react";
import { PaginationList } from "../components/PaginationList";
import { SearchField } from "../components/SearchField";

import mockList from "../mockData/mockList.json";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: "1rem 0 1rem 0",
      fontSize: "2.2rem",
      fontWeight: 400,
      textTransform: "uppercase",
      textAlign: "center",
      fontFamily: "Verdana",
    },
    media: {
      width: "100%",
      height: "initial",
    },
  })
);

export const Home = () => {
  const classes = useStyles();
  console.log("mockList.Search=", mockList.Search);
  const moviesList = mockList.Search;

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h1" className={classes.title}>
          Your Movies Library
        </Typography>
        <SearchField />
        <PaginationList moviesList={moviesList} />
      </Grid>
    </>
  );
};
