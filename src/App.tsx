import React from "react";
import { Route, Switch } from "react-router-dom";
import { ApplicationBar } from "./components/AppBar";
import { HomePage } from "./pages/HomePage";
import { LibraryPage } from "./pages/LibraryPage";
import { MoviePage } from "./pages/MoviePage";

function App() {
  return (
    <>
      <ApplicationBar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/library">
          <LibraryPage />
        </Route>
        <Route path="/movie">
          <MoviePage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
