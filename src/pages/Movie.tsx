import {
  Button,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchMovie } from "../redux/fetchMovie/fetchMovieActions";
import { IState } from "../redux/rootReducer";

// import mockMovie from "../mockData/mockMovie.json";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "1rem",
      [theme.breakpoints.up("sm")]: {
        width: "90%",
        margin: "0 auto",
      },
      [theme.breakpoints.up("md")]: { width: "80%" },
      [theme.breakpoints.up("lg")]: { width: "75%" },
    },
    descriptionContainer: {
      width: "80%",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    year: {
      color: "#9e9e9e",
    },
    infoTitle: {
      fontSize: "1.1rem",
      fontWeight: "bold",
    },
    votes: {
      color: "#9e9e9e",
      fontSize: "0.9rem",
    },
  })
);

export const Movie = () => {
  const theme = useTheme();
  const styles = useStyles();
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));

  const history = useHistory();
  const dispatch = useDispatch();
  // console.log(`history`, history);
  // const [movie, setmovie] = useState(null);
  useEffect(() => {
    // console.log(`history`, history);
    const movieId = history.location.search.split("=")[1];
    dispatch(fetchMovie(movieId));
  }, []);
  const movie = useSelector((state: IState) => state.movie?.movie!);
  // console.log(`movie`, movie);
  // setmovie(useSelector((state: IState) => state.movie));
  // const movie = undefined;

  if (!movie) return null;
  const {
    Poster,
    Title,
    Year,
    Plot,
    Awards,
    imdbRating,
    imdbVotes,
    Actors,
    Country,
    Genre,
    Runtime,
    BoxOffice,
  } = movie!;
  return (
    <>
      {movie ? (
        <Grid
          container
          direction={matchesSm ? "row" : "column"}
          alignItems={matchesSm ? "flex-start" : "center"}
          wrap={matchesSm ? "nowrap" : "wrap"}
          spacing={2}
          className={styles.container}
        >
          <Grid item>
            <img src={Poster} alt={Title} />
          </Grid>
          <Grid item className={styles.descriptionContainer}>
            <Typography variant="h1" className={styles.title}>
              {Title}
              <Typography
                display="inline"
                className={styles.year}
              >{` ${Year}`}</Typography>
            </Typography>
            <Typography>{Plot}</Typography>
            <Typography className={styles.infoTitle}>
              Awards: <Typography display="inline">{Awards}</Typography>
            </Typography>
            <Typography className={styles.infoTitle}>
              Rating: <Typography display="inline">{imdbRating}</Typography>{" "}
              <Typography display="inline" className={styles.votes}>
                {imdbVotes} votes
              </Typography>
            </Typography>
            <Typography className={styles.infoTitle}>
              Actors: <Typography display="inline">{Actors}</Typography>
            </Typography>
            <Typography className={styles.infoTitle}>
              Country: <Typography display="inline">{Country}</Typography>
            </Typography>
            <Typography className={styles.infoTitle}>
              Genre: <Typography display="inline">{Genre}</Typography>
            </Typography>
            <Typography className={styles.infoTitle}>
              Runtime: <Typography display="inline">{Runtime}</Typography>
            </Typography>
            <Typography className={styles.infoTitle}>
              Box office: <Typography display="inline">{BoxOffice}</Typography>
            </Typography>
            <Grid container item direction="row">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
              <Button>Watch</Button>
              <Button>Plan</Button>
              <Button>Favorites</Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Typography>Error</Typography>
      )}
    </>
  );
};
