import React from "react";
import { Route, Switch } from "react-router-dom";
import { ApplicationBar } from "./components/AppBar";
import { Home } from "./pages/Home";
import { Library } from "./pages/Library";
import { Movie } from "./pages/Movie";

function App() {
  return (
    <>
      <ApplicationBar />
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

      {/* {children} */}
    </>
  );
}

export default App;
