import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import React from "react";
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
  })
);
export const Home = () => {
  const classes = useStyles();
  console.log("mockList.Search=", mockList.Search);
  const pagesCount = mockList.Search.length;
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h1" className={classes.title}>
          Your Movies Library
        </Typography>
        {/* <Grid item alignItems="center"> */}
        <SearchField />
        {/* </Grid> */}
        <Pagination count={pagesCount} size="large" />
      </Grid>
    </>
  );
};
