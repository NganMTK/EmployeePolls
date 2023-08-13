import {Navigate, useLocation} from "react-router-dom";
import {connect} from "react-redux";

const PrivateRoute = ({children, loggedIn}) => {
    const location = useLocation();
    return loggedIn ? children : <Navigate to={`/?redirectTo=${location .pathname}`}/>;
};

const mapStateToProps = ({authedUser}) => ({
    loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);