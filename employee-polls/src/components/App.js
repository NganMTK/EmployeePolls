import { Fragment, useEffect } from "react";
import "../App.css";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading-bar";
import LogIn from "./login";
import Dashboard from "./dashboard";
import Poll from "./poll";
import PollCreation from "./poll-creation";
import LeaderBoard from "./leaderboard";
import NavigationBar from "./navigation-bar";
import PrivateRoute from "./private-page";
import PageNotFound from "./404page";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        {props.loggedIn && <NavigationBar />}
        {props.loading === true ? null : (
          <Routes>
            <Route path="/" exact element={<LogIn />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <PrivateRoute>
                  <LeaderBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <PollCreation />
                </PrivateRoute>
              }
            />
            <Route
              path="/question/:id"
              element={
                <PrivateRoute>
                  <Poll />
                </PrivateRoute>
              }
            />
            <Route
              path="/404"
              element={
                <PrivateRoute>
                  <PageNotFound />
                </PrivateRoute>
              }
            />
          </Routes>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: false,
  loggedIn: authedUser !== null,
});

export default connect(mapStateToProps)(App);
