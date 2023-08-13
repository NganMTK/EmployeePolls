import * as React from "react";
import {render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {createStore} from "redux";
import PollCreation from "./poll-creation";
import recuder from "../reducers";
import middleware from "../middleware";

const store = createStore(recuder, middleware);

describe("PollCreation", ()=> {
    it("have render component", ()=>{
        var component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <PollCreation/>
                </BrowserRouter>
            </Provider>
        );
        
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    })

    it("will have all expected fields", ()=>{
        var component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <PollCreation/>
                </BrowserRouter>
            </Provider>
        );
        
        var optionOne = component.getByPlaceholderText("Option One");
        var optionTwo = component.getByPlaceholderText("Option Second");

        expect(optionOne).toBeInTheDocument();
        expect(optionTwo).toBeInTheDocument();

        var submitButton = component.getByText("Submit")
        expect(submitButton).toBeInTheDocument();
    })
})
