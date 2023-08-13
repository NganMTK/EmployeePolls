import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../actions/authedUser";

const NavigationBar = ({ dispatch, authedUser, avatar }) => {
  const onLogout = () => {
    dispatch(handleLogout());
    return <Navigate to="/" />;
  };

  return (
    <header className="dashboard-header">
      <nav className="nav">
        <ul>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/leaderboard">LeaderBoard</Link>
          </li>
          <li>
            <Link to="/add">New</Link>
          </li>
        </ul>
      </nav>
      <div className="header-right">
          <div
            style={{
              width: 50,
              height: 50,
              backgroundImage: `url(${avatar})`,
            }}
          ></div>
          <span style={{paddingTop:"7 px"}}>{authedUser}</span>
        <Link to="/login" onClick={onLogout}>
          Logout
        </Link>
      </div>
    </header>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  avatar: users[authedUser] ? users[authedUser].avatarURL : "",
});

export default connect(mapStateToProps)(NavigationBar);
