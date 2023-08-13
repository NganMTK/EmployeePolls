import * as React from "react";
import {render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {createStore} from "redux";
import Dashboard from "./dashboard";
import recuder from "../reducers";
import middleware from "../middleware";

const store = createStore(recuder, middleware);

describe("Dashboard", ()=> {
    it("have render component", ()=>{
        var component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Dashboard/>
                </BrowserRouter>
            </Provider>
        );
        
        expect(component).toBeDefined();
    })

    
})
