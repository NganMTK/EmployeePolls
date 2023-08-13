import * as React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import App from "./App";
import recuder from "../reducers";
import middleware from "../middleware";

const store = createStore(recuder, middleware);

describe("App", () => {
  it("have render component", () => {
    var component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});
