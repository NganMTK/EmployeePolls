import * as React from "react";
import {render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {createStore} from "redux";
import Login from "./login";
import recuder from "../reducers";
import middleware from "../middleware";

const store = createStore(recuder, middleware);

describe("Login", ()=> {
    it("have render component", ()=>{
        var component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
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
                    <Login/>
                </BrowserRouter>
            </Provider>
        );
        
        var usernameInput = component.getByTestId("usename-input")
        var passwordInput = component.getByTestId("password-input")
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        var submitButton = component.getByText("Submit")
        expect(submitButton).toBeInTheDocument();
    })

    it("will display alert error when input wrong username", ()=>{
        var component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );
        
        var input = component.getByTestId("usename-input");
        fireEvent.change(input, { target: { value: 'username' } });

        var submitButton = component.getByTestId("submit-button");
        fireEvent.click(submitButton);
        expect(component.getByTestId("alert-error")).toBeInTheDocument();
    })

    // it("will not display alert error when input correct username and password", ()=>{
    //     var component = render(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <Login/>
    //             </BrowserRouter>
    //         </Provider>
    //     );
        
    //     var usernameInput = component.getByTestId("usename-input");
    //     fireEvent.change(usernameInput, { target: { value: "sarahedo" } });
    //     var passwordInput = component.getByTestId("password-input");
    //     fireEvent.change(passwordInput, { target: { value: "password123" } });

    //     var submitButton = component.getByTestId("submit-button");
    //     fireEvent.click(submitButton);
    //     expect(component.queryByTestId("alert-error")).not.toBeInTheDocument();
    // })
})
