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
import React from "react";
// { useEffect, useState }

import { ICard } from "../interfaces/ICard";
// import { getPagesCount } from "./PaginationListHelpers/getPagesCount";
// import { splitMoviesList } from "./PaginationListHelpers/splitMoviesList";
import { ScrollTop } from "./ScrollTop";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../redux/rootReducer";
import { setCurrentPage } from "../redux/currentPage/currentPageActions";
// import { fetchMovieAction } from "../redux/fetchMovie/fetchMovieActions";
import { useHistory } from "react-router-dom";
// import { Loader } from "./Loader";
// import { useSelector } from "react-redux";
// import { IState } from "../redux/rootReducer";

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
      // fontWeight: "bolder",
    },
    pagination: {
      width: "100%",
    },
    backToTopAnchor: {
      height: 0,
    },
  })
);

export interface IPaginationList {
  moviesList: ICard[];
}

export const PaginationList = ({ moviesList }: IPaginationList) => {
  // console.log("PaginationList=");
  const classes = useStyles();
  // const pagesCount = getPagesCount(moviesList.length);
  const pagesCount = Math.ceil(
    useSelector((state: IState) => state.searchResults.totalResults) / 10
  );
  // const splittedMoviesList = splitMoviesList(moviesList, pagesCount);
  // console.log("moviesList", moviesList);
  // console.log("pagesCount", pagesCount);
  // const [displayedMoviesList, setdisplayedMoviesList] = useState(
  //   splittedMoviesList[0]
  // );
  // useEffect(() => {
  //   setdisplayedMoviesList(moviesList);
  // }, [moviesList]);

  // console.log("displayedMoviesList=", displayedMoviesList);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const displayedMoviesList = moviesList;
  const searchRequest = useSelector(
    (state: IState) => state.search.searchRequest
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChange = (event: React.ChangeEvent<any>, page: number) => {
    // setdisplayedMoviesList(splittedMoviesList[page - 1]);
    // console.log(`page`, page);
    // console.log(`searchRequest`, searchRequest);
    dispatch(setCurrentPage(page));
  };
  const handleClick = (movieId: string) => {
    // dispatch(fetchMovieAction(movieId));
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
            // className={classes.positionContainer}
          >
            {displayedMoviesList
              ? displayedMoviesList.map((movie: ICard) => (
                  <Grid item key={movie.imdbID} xs={12} sm={6} md={4}>
                    <Card className={classes.root}>
                      <CardActionArea
                        onClick={() => {
                          handleClick(movie.imdbID);
                          console.log(`movie.imdbID`, movie.imdbID);
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
              : // <Typography align="center" className={classes.message}>
                //   Nothing here
                // </Typography>
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
              // container
              // direction="row"
              // justify="center"
              // alignItems="center"
              // className={classes.pagination}
              >
                <Pagination
                  count={pagesCount}
                  defaultPage={1}
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
