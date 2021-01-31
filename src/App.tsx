import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Library } from "./pages/Library";
import { Movie } from "./pages/Movie";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/library">
          <Library />
        </Route>
        <Route exact path="/movie">
          <Movie />
        </Route>
      </Switch>
    </>
  );
}

export default App;
