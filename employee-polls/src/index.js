import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import {createStore} from "redux";
import {Provider} from "react-redux";
import recuder from "./reducers";
import middleware from "./middleware";
import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(recuder, middleware);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
