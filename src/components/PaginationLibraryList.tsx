import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createStyles,
  Fab,
  Grid,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useState } from "react";


import { ICard } from "../interfaces/ICard";
import { ScrollTop } from "./ScrollTop";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../redux/rootReducer";
import { setCurrentPage } from "../redux/currentPage/currentPageActions";
import { useHistory } from "react-router-dom";
import { moviesPerPageDefaultServerResponse } from "../apiAttributes/apiAttributes";
import { splitMoviesList } from "./PaginationListHelpers/splitMoviesList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "1rem 0 1rem 0",
    },
    root: {
      margin: "1rem",
    },
    media: {
      [theme.breakpoints.down("md")]: {
        height: 270,
        width: 180,
      },
      height: 450,
      width: 300,
      marginLeft: "auto",
      marginRight: "auto",
    },
    message: {
      margin: "1rem",
      color: "rgba(0, 0, 0, 0.54)",
      textTransform: "uppercase",
    },
    pagination: {
      width: "100%",
    },
    backToTopAnchor: {
      height: 0,
    },
  })
);

export interface IPaginationLibraryList {
  moviesList: ICard[];
  pagesCount: number;
  currentPage?: number
}

export const PaginationLibraryList = ({ moviesList, pagesCount, currentPage = 1 }: IPaginationLibraryList) => {
  const classes = useStyles();
  const theme = useTheme();

  const moreThanMaxMoviesPerPage = moviesList.length % moviesPerPageDefaultServerResponse !== 0;
  const libraryLists = splitMoviesList(moviesList, pagesCount);
  const [displayedMoviesList, setdisplayedMoviesLiest] = useState(libraryLists[0])
  const history = useHistory();
  const handleChange = (event: React.ChangeEvent<any>, page: number) => {
  setdisplayedMoviesLiest(libraryLists[page-1])
  };

  const handleClick = (movieId: string) => {
    history.push("/movie/?=" + movieId);
  };

  return (
      <>
      <Grid container spacing={0}>
        <Toolbar id="back-to-top-anchor" className={classes.backToTopAnchor} />
        <Grid container className={classes.container} spacing={2}>
          <Grid
            container
            justify="center"
            direction="row"
            wrap="wrap"
          >
            {displayedMoviesList
              ? displayedMoviesList.map((movie: ICard) => (
                <Grid item key={movie.imdbID} xs={12} sm={6} md={4}>
                  <Card className={classes.root}>
                    <CardActionArea
                      onClick={() => {
                        handleClick(movie.imdbID);
                      }}
                    >
                      {movie.Poster !== "N/A" ? (
                        <CardMedia
                          image={movie.Poster}
                          title={movie.Title}
                          className={classes.media}
                        />
                      ) : (
                        <Typography
                          gutterBottom
                          variant="caption"
                          component="h2"
                          align="center"
                          className={classes.message}
                        >
                          {movie.Title}, no poster
                        </Typography>
                      )}

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          align="center"
                        >
                          {movie.Title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Year: {movie.Year}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
              : 
              null}
          </Grid>
          {displayedMoviesList.length ? (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid
              >
                <Pagination
                  count={pagesCount}
                  defaultPage={currentPage}
                  siblingCount={1}
                  boundaryCount={1}
                  size="large"
                  className={classes.pagination}
                  onChange={(event: React.ChangeEvent<any>, page: number) =>
                    handleChange(event, page)
                  }
                />
              </Grid>
            </Grid>
          ) : null}
        </Grid>
        <ScrollTop {...null}>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Grid>
    </>
  );
};
