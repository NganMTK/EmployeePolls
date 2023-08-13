import * as React from "react";
import {render, fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {createStore} from "redux";
import LeaderBoard from "./leaderboard";
import recuder from "../reducers";
import middleware from "../middleware";

const store = createStore(recuder, middleware);

describe("LeaderBoard", ()=> {
    it("have render component", ()=>{
        var component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <LeaderBoard/>
                </BrowserRouter>
            </Provider>
        );
        
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    })

    it("will generate a table", () => {

        var component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <LeaderBoard/>
                </BrowserRouter>
            </Provider>
        );

        const table = component.getAllByRole("table");

        expect(table).toHaveLength(1);
    });
})
