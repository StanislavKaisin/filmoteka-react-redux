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
import { getPagesCount } from "./PaginationListHelpers/getPagesCount";
import { splitMoviesList } from "./PaginationListHelpers/splitMoviesList";
import { ScrollTop } from "./ScrollTop";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    positionContainer: { position: "absolute" },
    positionRelative: {
      position: "relative",
    },
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
  })
);

export interface IPaginationList {
  moviesList: ICard[];
}

export const PaginationList = ({ moviesList }: IPaginationList) => {
  console.log("PaginationList=");
  const classes = useStyles();
  const pagesCount = getPagesCount(moviesList.length);
  const splittedMoviesList = splitMoviesList(moviesList, pagesCount);
  // console.log("moviesList", moviesList);

  const [displayedMoviesList, setdisplayedMoviesList] = useState(
    splittedMoviesList[0]
  );
  // console.log("displayedMoviesList=", displayedMoviesList);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  console.log("theme=", theme);
  console.log("matches=", matches);

  const handleChange = (event: React.ChangeEvent<any>, page: number) => {
    setdisplayedMoviesList(splittedMoviesList[page - 1]);
  };

  return (
    <>
      <Grid
        container
        // className={classes.positionContainer}
      >
        <Toolbar id="back-to-top-anchor" />
        <Grid container className={classes.container} spacing={2}>
          <Grid
            container
            justify="center"
            direction="row"
            wrap="wrap"
            // className={classes.positionContainer}
          >
            {displayedMoviesList ? (
              displayedMoviesList.map((movie: ICard) => (
                <Grid item key={movie.imdbID} xs={12} sm={6} md={4}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        image={movie.Poster}
                        title={movie.Title}
                        className={classes.media}
                      />
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
            ) : (
              <Typography align="center" className={classes.message}>
                Nothing here
              </Typography>
            )}
          </Grid>
          {splittedMoviesList.length ? (
            <Grid container justify="center" direction="row">
              <Pagination
                count={pagesCount}
                size="large"
                onChange={(event: React.ChangeEvent<any>, page: number) =>
                  handleChange(event, page)
                }
              />
            </Grid>
          ) : null}
        </Grid>
        <ScrollTop {...null} className="positionRelative">
          <Fab size="medium" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Grid>
    </>
  );
};
