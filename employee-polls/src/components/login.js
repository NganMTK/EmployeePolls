import { useState } from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { handleLogin } from "../actions/authedUser";

const LogIn = ({ dispatch, loggedIn, users }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get("redirectTo");

  const [userName, setUserName] = useState("sarahedo");
  const [password, setPassword] = useState("password123");
  const [alert, setAlert] = useState(false);

  const onClickBtnSubmit = () => {
    const user = Object.values(users).filter(
      (user) => user.id === userName && user.password === password
    );

    if (user && user.length > 0) {
      dispatch(handleLogin(userName, password));

      setUserName("");
      setPassword("");
    } else {
      setAlert(true);
    }
  };

  if (loggedIn) {
    return <Navigate to={redirect ? redirect : "/dashboard"} />;
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Log In</h2>
      </div>
      <div className="login-field-group">
        {alert && (
          <div data-testid="alert-error" className="alert-error">
            <span>Invalid username or password.</span>
          </div>
        )}
        <div>
          <label className="login-username">User</label>
          <input
            type="text"
            name="username"
            data-testid="usename-input"
            placeholder="Username"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            data-testid="password-input"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="login-submit-btn">
          <input
            type="submit"
            value="Submit"
            data-testid="submit-button"
            onClick={onClickBtnSubmit}
          ></input>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  loggedIn: !!authedUser,
  users,
});

export default connect(mapStateToProps)(LogIn);
