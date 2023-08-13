import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import PollCreation from "./poll-creation";
import recuder from "../reducers";
import middleware from "../middleware";
import { handleAddQuestion } from "../actions/questions";

const store = createStore(recuder, middleware);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// allows us to easily return reponses and/or success/fail for a thunk that calls a service
const mockServiceCreator =
  (body, succeeds = true) =>
  () =>
    new Promise((resolve, reject) => {
      setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10);
    });

describe("PollCreation", () => {
  it("have render component", () => {
    var component = render(
      <Provider store={store}>
        <BrowserRouter>
          <PollCreation />
        </BrowserRouter>
      </Provider>
    );

    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("will have all expected fields", () => {
    var component = render(
      <Provider store={store}>
        <BrowserRouter>
          <PollCreation />
        </BrowserRouter>
      </Provider>
    );

    var optionOne = component.getByPlaceholderText("Option One");
    var optionTwo = component.getByPlaceholderText("Option Second");

    expect(optionOne).toBeInTheDocument();
    expect(optionTwo).toBeInTheDocument();

    var submitButton = component.getByText("Submit");
    expect(submitButton).toBeInTheDocument();
  });

//   it("will save question", () => {
//     var component = render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <PollCreation />
//         </BrowserRouter>
//       </Provider>
//     );

//     store
//       .dispatch(handleAddQuestion("learn A", "learn B"))
//       .then(() =>
//         expect(store.getAction()).toContainEqual({ type: "ADD_QUESTION" })
//       );
//   });
});
