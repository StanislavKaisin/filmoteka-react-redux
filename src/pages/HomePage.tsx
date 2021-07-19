import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import { PaginationList } from "../components/PaginationList";
import { SearchField } from "../components/SearchField";

import mockList from "../mockData/mockList.json";
import { hideLoader, showLoader } from "../redux/loader/loaderActions";

import { IState } from "../redux/rootReducer";

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
    searchRequest: {
      padding: "1rem 0 1rem 0",
      fontSize: "1.2rem",
      fontWeight: 400,
      textTransform: "uppercase",
      textAlign: "center",
      fontFamily: "Verdana",
    },
  })
);

export const HomePage = () => {
  const classes = useStyles();

  const moviesList = useSelector(
    (state: IState) => state.searchResults.results
  );
  let loading = useSelector((state: IState) => state.loader.loading);
  let search = useSelector((state: IState) => state.search.searchRequest);
  let error = useSelector((state: IState) => state.error.error);

  const dispatch = useDispatch();

  const pagesCount = Math.ceil(
    useSelector((state: IState) => state.searchResults.totalResults) / 10
  );
  const currentPage = 
    useSelector((state: IState) => state.currentPage.currentPage)

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h1" className={classes.title}>
          Your Movies Library
        </Typography>
        <SearchField />
        {/* <Button onClick={handleClick}>show loader</Button>
        <Button onClick={handleClick2}>hide loader</Button> */}
        {/* {loading && <Loader />} */}
        {search && (
          <Typography variant="h2" className={classes.searchRequest}>
            Results for : {search}
          </Typography>
        )}
        {error && (
          <Typography variant="h2" className={classes.searchRequest}>
            {error}
          </Typography>
        )}
        {loading && <Loader />}
        <PaginationList moviesList={moviesList} pagesCount={pagesCount} currentPage={currentPage}/>
      </Grid>
    </>
  );
};
