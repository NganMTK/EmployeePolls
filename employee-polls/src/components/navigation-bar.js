import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../actions/authedUser";

const NavigationBar = ({ dispatch, authedUser, avatar }) => {
  const onLogout = () => {
    dispatch(handleLogout());
  };

  return (
    <header className="dashboard-header">
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
      <div className="header-right">
          <div
            style={{
              width: 50,
              height: 50,
              backgroundImage: `url(${avatar})`,
            }}
          ></div>
          <span style={{paddingTop:"7 px"}}>{authedUser}</span>
        <Link to="/" onClick={onLogout}>
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
