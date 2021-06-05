import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";

import App from "./App";
import { loadState, saveState } from "./redux/middleware/localStorage";
import { rootReducer } from "./redux/rootReducer";
import { sagaWatcher } from "./redux/sagas";
import reportWebVitals from "./reportWebVitals";

const saga = createSagaMiddleware();

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(saga))
);

store.subscribe(() => {
  saveState(store.getState());
});

saga.run(sagaWatcher);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
